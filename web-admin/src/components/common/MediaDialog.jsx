import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Box, Typography
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { AddPhotoAlternate, Delete, Visibility } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { mediaFileApi } from '../../api/routeStopApi';
import MediaFormDialog from './MediaFormDialog';

/*  Dialog quản lý Media cho BusRoute / BusStop  */
export default function MediaDialog({ open, type, idOwner, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  /* list + loading */
  const [files, setFiles]   = useState([]);
  const [loading, setLoad]  = useState(false);

  /* add / edit */
  const [formOpen, setFormOpen] = useState(false);

  /* preview */
  const [viewUrl, setViewUrl]   = useState(null);

  /* confirm xoá */
  const [delRow, setDelRow]     = useState(null);

  /* ───────── Load list bất mỗi lần mở ───────── */
  const loadList = async () => {
    if (!open) return;
    setLoad(true);
    try {
      const list = await mediaFileApi.list(
        type === 'route' ? { idBusRoute: idOwner } : { idBusStop: idOwner }
      );
      setFiles(list);
    } catch (e) {
      enqueueSnackbar('Lỗi tải media', { variant: 'error' });
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => { loadList(); }, [open]);

  /* ───────── Upload ───────── */
  const handleUpload = async (form) => {
    try {
      await mediaFileApi.uploadSingle({
        idBusRoute: type === 'route' ? idOwner : null,
        idBusStop : type === 'stop'  ? idOwner : null,
        fileName   : form.fileName,
        file       : form.file
      });
      enqueueSnackbar('Upload thành công', { variant: 'success' });
      setFormOpen(false);
      loadList();
    } catch (e) {
      enqueueSnackbar(e.message || 'Upload thất bại', { variant: 'error' });
    }
  };

  /* ───────── Xem ảnh ───────── */
  const handleView = async (row) => {
    try {
      const url = await mediaFileApi.fetch(row.idMediaFile);
      setViewUrl(url);
    } catch (e) {
      enqueueSnackbar('Lỗi xem ảnh', { variant: 'error' });
    }
  };

  /* ───────── Xoá ───────── */
  const handleDelete = async () => {
    try {
      await mediaFileApi.delete(delRow.idMediaFile);
      setFiles(files.filter(f => f.idMediaFile !== delRow.idMediaFile));
      enqueueSnackbar('Xoá thành công', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(e.message || 'Xoá thất bại', { variant: 'error' });
    } finally {
      setDelRow(null);
    }
  };

  /* ───────── Cột DataGrid ───────── */
  const columns = [
    { field: 'idMediaFile', headerName: 'ID', width: 70 },
    { field: 'fileName',    headerName: 'Tên file', width: 220 },
    { field: 'fileType',    headerName: 'Loại', width: 160 },
    {
      field: 'actions', headerName: '', type: 'actions', width: 120,
      getActions: (p) => [
        <GridActionsCellItem
          icon={<Visibility />} label="Xem"
          onClick={() => handleView(p.row)}
        />,
        <GridActionsCellItem
          icon={<Delete color="error" />} label="Xoá"
          onClick={() => setDelRow(p.row)}
        />
      ]
    }
  ];

  return (
    <>
      {/* MAIN DIALOG */}
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Media của {type === 'route' ? 'tuyến xe' : 'điểm dừng'} #{idOwner}
        </DialogTitle>

        <DialogContent dividers>
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternate />}
            sx={{ mb: 2 }}
            onClick={() => setFormOpen(true)}
          >
            Thêm Media
          </Button>

          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={files}
              columns={columns}
              loading={loading}
              getRowId={(r) => r.idMediaFile}
              sx={{
                '& .MuiDataGrid-virtualScroller': { minHeight: 200 }
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* ADD FORM */}
      <MediaFormDialog
        open={formOpen}
        initData={null}
        onClose={() => setFormOpen(false)}
        onSubmit={handleUpload}
      />

      {/* PREVIEW */}
      <Dialog open={!!viewUrl} onClose={() => setViewUrl(null)} maxWidth="md">
        <DialogTitle>Xem ảnh</DialogTitle>
        <DialogContent>
          {viewUrl
            ? <img src={viewUrl} alt="" style={{ width: '100%' }} />
            : <Typography>Không thể hiển thị ảnh.</Typography>}
        </DialogContent>
      </Dialog>

      {/* CONFIRM DELETE */}
      <Dialog open={!!delRow} onClose={() => setDelRow(null)}>
        <DialogTitle>Bạn chắc chắn muốn xoá ảnh này?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDelRow(null)}>Huỷ</Button>
          <Button color="error" onClick={handleDelete}>Xoá</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
