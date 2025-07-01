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
import { stopApi } from '../../api/routeStopApi';
import StopFormDialog from './StopFormDialog';
import MediaDialog from '../common/MediaDialog';

/* ───────────────────── CỘT BẢNG ĐIỂM DỪNG ───────────────────── */
const baseCols = [
  { field: 'idBusStop', headerName: 'ID', width: 70 },
  { field: 'busStopName', headerName: 'Tên điểm dừng', width: 220 },
  { field: 'address', headerName: 'Địa chỉ', width: 240 },
  { field: 'stopOrder', headerName: 'Thứ tự', width: 90, type: 'number' },
  {
    field: 'isAvailable', headerName: 'Trạng thái', width: 120,
    renderCell: p => (
      <Chip
        label={p.value ? 'Hoạt động' : 'Ngừng'}
        color={p.value ? 'success' : 'error'}
        size="small"
      />
    ),
  },
];

export default function StopTable({ data, onRefresh }) {
  const { enqueueSnackbar } = useSnackbar();

  /* form xem / sửa */
  const [openForm, setOpenForm] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selected, setSelected] = useState(null);

  /* dialog media */
  const [mediaOpen, setMediaOpen] = useState(false);

  /* xoá điểm dừng */
  const handleDelete = async (row) => {
    try {
      await stopApi.delete(row.idBusStop);
      enqueueSnackbar('Xoá thành công', { variant: 'success' });
      onRefresh();
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || 'Lỗi xoá', { variant: 'error' });
    }
  };

  const columns = [
    ...baseCols,
    {
      field: 'actions', type: 'actions', width: 180,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />} label="Xem"
          onClick={() => { setSelected(params.row); setViewMode(true); setOpenForm(true); }}
        />,
        <GridActionsCellItem
          icon={<Edit />} label="Sửa"
          onClick={() => { setSelected(params.row); setViewMode(false); setOpenForm(true); }}
        />,
        <GridActionsCellItem
          icon={<Delete color="error" />} label="Xoá"
          onClick={() => handleDelete(params.row)}
        />,
        <GridActionsCellItem
          icon={<PhotoCamera />} label="Media"
          onClick={() => { setSelected(params.row); setMediaOpen(true); }}
        />,
      ],
    },
  ];

  return (
    <>
      {/* ─────────── BẢNG ĐIỂM DỪNG ─────────── */}
      <Box sx={{ height: 600 }}>
        <Button
          variant="contained"
          onClick={() => { setSelected(null); setViewMode(false); setOpenForm(true); }}
          sx={{ mb: 2 }}
        >
          Thêm điểm dừng
        </Button>

        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(r) => r.idBusStop}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>

      {/* ─────────── FORM ĐIỂM DỪNG ─────────── */}
      <StopFormDialog
        open={openForm}
        data={selected}
        mode={viewMode ? 'detail' : (selected ? 'edit' : 'add')}
        onClose={() => { setOpenForm(false); setSelected(null); }}
        onSuccess={onRefresh}
      />

      {/* ─────────── DIALOG MEDIA ─────────── */}
      <MediaDialog
        open={mediaOpen}
        type="stop"
        idOwner={selected?.idBusStop}
        onClose={() => setMediaOpen(false)}
      />
    </>
  );
}
