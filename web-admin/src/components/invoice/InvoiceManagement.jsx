import { useEffect, useState } from 'react';
import {
  Paper, Typography, TextField, InputAdornment, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Switch, FormControlLabel, Button, Box
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Search as SearchIcon, Clear, Edit } from '@mui/icons-material';
import { invoiceApi } from '../../api/invoiceApi';
import { useSnackbar } from 'notistack';

export default function InvoiceManagement() {
  const { enqueueSnackbar } = useSnackbar();

  /* list + loading */
  const [rows, setRows]   = useState([]);
  const [loading, setLd ] = useState(false);

  /* search */
  const [term, setTerm] = useState('');
  const [query, setQry] = useState('');

  /* detail */
  const [selInv,  setSel ] = useState(null);
  const [detRows, setDet]  = useState([]);
  const [loadingDet, setLdDet] = useState(false);

  /* edit */
  const [editOpen, setEdit] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  /* toast helper */
  const toast = (status, message) =>
    enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });

  /* load list */
  const loadList = () => {
    setLd(true);
    invoiceApi.getAll()
      .then(setRows)
      .catch((e) => toast('FAILED', e.message))
      .finally(() => setLd(false));
  };
  useEffect(loadList, []);

  /* load detail */
  useEffect(() => {
    if (!selInv) { setDet([]); return; }
    setLdDet(true);
    invoiceApi.getDetail(selInv.idInvoice)
      .then(setDet)
      .catch((e) => toast('FAILED', e.message))
      .finally(() => setLdDet(false));
  }, [selInv]);

  /* columns */
  const invCols = [
    { field: 'idInvoice', headerName: 'ID', width: 80 },
    { field: 'fullName', headerName: 'Khách hàng', width: 180 },
    { field: 'phoneNumber', headerName: 'Điện thoại', width: 140 },
    { field: 'totalPrice', headerName: 'Tổng tiền', width: 120 },
    { field: 'paidDateTime', headerName: 'Thanh toán lúc', width: 180 },
    {
      field: 'paymentMethod', headerName: 'Hình thức', width: 90,
      valueGetter: (value) => value ? 'Chuyển khoản' : 'Tiền mặt'
    },
    { field: 'paymentVia', headerName: 'Kênh', width: 110,
    },
    {
      field: 'status', headerName: 'Trạng thái', width: 100,
      valueGetter: (value) => value ? 'Chưa huỷ' : 'Đã huỷ'
    },
    {
      field: 'actions', type: 'actions', width: 80,
      getActions: ({ row }) => [
        <IconButton
          onClick={() => {
            setEditStatus(row.status);
            setSel(row);        // bảo đảm detail sync
            setEdit(true);
          }}>
          <Edit />
        </IconButton>,
      ],
    },
  ];

  const detCols = [
    { field: 'idInvoiceDetail', headerName: 'ID CT', width: 100 },
    { field: 'busRouteName', headerName: 'Tuyến xe', width: 160 },
    { field: 'date', headerName: 'Ngày KH', width: 120 },
    { field: 'ticketType', headerName: 'Loại vé', width: 110 },
    { field: 'parentPrice', headerName: 'Giá NL', width: 100 },
    { field: 'childPrice', headerName: 'Giá TE', width: 100 },
    { field: 'price', headerName: 'Đơn giá', width: 100 },
    { field: 'voucherCode', headerName: 'Voucher', width: 100 },
  ];

  /* search */
  const handleSearch = () => setQry(term.trim());
  const filtered = rows.filter(
    (r) =>
      r.fullName.toLowerCase().includes(query.toLowerCase()) ||
      r.idInvoice.toString() === query
  );

  /* update status */
  const saveStatus = async () => {
    try {
      const res = await invoiceApi.updateStatus(selInv.idInvoice, editStatus);
      toast('SUCCESS', 'Cập nhật thành công');
      setEdit(false);
      loadList();
    } catch (e) {
      toast('FAILED', e.message);
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h5" gutterBottom>Quản lý hoá đơn</Typography>

      {/* Search */}
      <TextField
        label="Tìm kiếm (ID / tên KH)"
        fullWidth
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}><SearchIcon /></IconButton>
              {query && (
                <IconButton onClick={() => { setTerm(''); setQry(''); }}>
                  <Clear />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Invoice grid */}
      <Box sx={{ height: 320 }}>
        <DataGrid
          rows={filtered}
          columns={invCols}
          getRowId={(r) => r.idInvoice}
          loading={loading}
          pageSize={5}
          onRowClick={(p) => setSel(p.row)}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      {/* Detail grid */}
      {selInv && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Chi tiết hoá đơn #{selInv.idInvoice}</Typography>
          <Box sx={{ height: 250, mt: 1 }}>
            <DataGrid
              rows={detRows}
              columns={detCols}
              getRowId={(r) => r.idInvoiceDetail}
              loading={loadingDet}
              pageSize={5}
              slots={{ toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}

      {/* Edit dialog */}
      <Dialog open={editOpen} onClose={() => setEdit(false)}>
        <DialogTitle>Cập nhật trạng thái</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={editStatus}
                onChange={(e) => setEditStatus(e.target.checked)}
              />
            }
            label={editStatus ? 'Hoạt động' : 'Huỷ'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(false)}>Huỷ</Button>
          <Button variant="contained" onClick={saveStatus}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
