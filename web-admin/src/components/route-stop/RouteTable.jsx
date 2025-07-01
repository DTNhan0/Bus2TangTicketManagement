import React, { useState } from 'react';
import {
  DataGrid, GridToolbar, GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Visibility, Edit, Delete, PhotoCamera,
} from '@mui/icons-material';
import {
  Button, Box, Chip,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { routeApi } from '../../api/routeStopApi';
import RouteFormDialog from './RouteFormDialog';
import MediaDialog from '../common/MediaDialog';

/* ───────────────────── CỘT BẢNG TUYẾN ───────────────────── */
const baseCols = [
  { field: 'idBusRoute', headerName: 'ID', width: 70 },
  { field: 'busRouteName', headerName: 'Tên tuyến', width: 220 },
  {
    field: 'isAvailable', headerName: 'Trạng thái', width: 120,
    renderCell: p => (
      <Chip
        label={p.value ? 'Hoạt động' : 'Tạm dừng'}
        color={p.value ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  { field: 'updateAt', headerName: 'Cập nhật', width: 160 },
];

export default function RouteTable({ data, onRefresh }) {
  const { enqueueSnackbar } = useSnackbar();

  /* form xem / sửa */
  const [openForm, setOpenForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selected, setSelected] = useState(null);

  /* dialog media */
  const [mediaOpen, setMediaOpen] = useState(false);

  /* xoá tuyến */
  const handleDelete = async (row) => {
    try {
      await routeApi.delete(row.idBusRoute);
      enqueueSnackbar('Xoá thành công', { variant: 'success' });
      onRefresh();
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || 'Lỗi xoá', { variant: 'error' });
    }
  };

  /* ghép action vào columns */
  const columns = [
    ...baseCols,
    {
      field: 'actions', type: 'actions', width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />} label="Xem"
          onClick={() => {
            setSelected(params.row);
            setViewMode(true);
            setOpenForm(true);
          }}
        />,
        <GridActionsCellItem
          icon={<Edit />} label="Sửa"
          onClick={() => {
            setSelected(params.row);
            setViewMode(false);
            setOpenForm(true);
          }}
        />,
        <GridActionsCellItem
          icon={<Delete color="error" />} label="Xoá"
          onClick={() => handleDelete(params.row)}
        />,
        <GridActionsCellItem
          icon={<PhotoCamera />} label="Media"
          onClick={() => {
            setSelected(params.row);
            setMediaOpen(true);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      {/* ─────────── BẢNG TUYẾN ─────────── */}
      <Box sx={{ height: 600 }}>
        <Button
          variant="contained"
          onClick={() => { setSelected(null); setViewMode(false); setOpenForm(true); }}
          sx={{ mb: 2 }}
        >
          Thêm tuyến xe
        </Button>

        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(r) => r.idBusRoute}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>

      {/* ─────────── FORM TUYẾN ─────────── */}
      <RouteFormDialog
        open={openForm}
        data={selected}
        mode={viewMode ? 'detail' : (selected ? 'edit' : 'add')}
        onClose={() => { setOpenForm(false); setSelected(null); }}
        onSuccess={onRefresh}
      />

      {/* ─────────── DIALOG MEDIA ─────────── */}
      <MediaDialog
        open={mediaOpen}
        type="route"
        idOwner={selected?.idBusRoute}
        onClose={() => setMediaOpen(false)}
      />
    </>
  );
}
