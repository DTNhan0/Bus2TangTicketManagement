import { useEffect, useState } from 'react';
import {
  Paper, Typography, TextField, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, Box
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Add, Delete } from '@mui/icons-material';
import { voucherApi } from '../../api/voucherApi';
import { useSnackbar } from 'notistack';

export default function VoucherManagement() {
  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows]   = useState([]);
  const [loading, setLoad]= useState(false);

  const [addOpen,   setAdd]   = useState(false);
  const [delOpen,   setDel]   = useState(false);
  const [delCode,   setCode]  = useState(null);

  const [form, setForm] = useState({
    voucherCode: '', percent: 0, content: '',
    expired: '', count: 0,
  });

  /* min datetime-local = hiện tại */
  const minExpired = new Date().toISOString().slice(0, 16);

  /* helper hiển thị message BE */
  const toast = (status, message) =>
    enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });

  /* load list */
  const loadData = () => {
    setLoad(true);
    voucherApi.getAll()
      .then(setRows)
      .catch((e) => toast('FAILED', e.message))
      .finally(() => setLoad(false));
  };
  useEffect(loadData, []);

  /* columns */
  const cols = [
    { field: 'voucherCode', headerName: 'Mã', width: 160 },
    { field: 'percent',     headerName: 'Phần trăm', width: 120 },
    { field: 'content',     headerName: 'Nội dung', flex: 1 },
    { field: 'expired',     headerName: 'Hết hạn', width: 180 },
    { field: 'count',       headerName: 'Số lượt', width: 110, type: 'number' },
    {
      field: 'actions', headerName: '', width: 90, type: 'actions',
      getActions: ({ row }) => [
        <IconButton color="error" onClick={() => {
          setCode(row.voucherCode); setDel(true);
        }}>
          <Delete />
        </IconButton>,
      ],
    },
  ];

  /* delete */
  const handleDelete = async () => {
    try {
      const res = await voucherApi.delete(delCode);
      toast('SUCCESS', `Đã xoá voucher ${res.voucherCode}`);
      loadData();
    } catch (e) {
      toast('FAILED', e.message);
    } finally {
      setDel(false); setCode(null);
    }
  };

  /* add */
  const handleAdd = async () => {
    if (form.expired < minExpired) {
      toast('FAILED', 'Ngày hết hạn phải lớn hơn hiện tại');
      return;
    }
    try {
      await voucherApi.create(form);
      toast('SUCCESS', 'Tạo voucher thành công');
      loadData();
      setAdd(false);
    } catch (e) {
      toast('FAILED', e.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h5" gutterBottom>Quản lý voucher</Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => { setForm({ voucherCode:'', percent:0, content:'', expired:'', count:0 }); setAdd(true); }}
      >
        Thêm
      </Button>

      <Box sx={{ height: 420, mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={cols}
          getRowId={(r) => r.voucherCode}
          loading={loading}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      {/* ----- Dialog Thêm ----- */}
      <Dialog open={addOpen} onClose={() => setAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm voucher</DialogTitle>
        <DialogContent dividers>
          <TextField label="Mã voucher" fullWidth margin="dense"
                     value={form.voucherCode}
                     onChange={(e) => setForm({ ...form, voucherCode: e.target.value })}/>
          <TextField label="Phần trăm" type="number" fullWidth margin="dense"
                     value={form.percent}
                     onChange={(e) => setForm({ ...form, percent: +e.target.value })}/>
          <TextField label="Nội dung" fullWidth margin="dense"
                     value={form.content}
                     onChange={(e) => setForm({ ...form, content: e.target.value })}/>
          <TextField label="Hết hạn" type="datetime-local" fullWidth margin="dense"
                     value={form.expired}
                     onChange={(e) => setForm({ ...form, expired: e.target.value })}
                     InputProps={{ inputProps: { min: minExpired } }}/>
          <TextField label="Số lượt" type="number" fullWidth margin="dense"
                     value={form.count}
                     onChange={(e) => setForm({ ...form, count: +e.target.value })}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdd(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleAdd}
                  disabled={!form.voucherCode || !form.expired}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* ----- Dialog Xoá ----- */}
      <Dialog open={delOpen} onClose={() => setDel(false)}>
        <DialogTitle>Xác nhận xoá voucher “{delCode}” ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDel(false)}>Huỷ</Button>
          <Button color="error" onClick={handleDelete}>Xoá</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
