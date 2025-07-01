import { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getAllAccounts } from '../../api/accountApi';         // đã có sẵn
import { useSnackbar } from 'notistack';

export default function AccountPickerDialog({ open, onClose, onPick }) {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows]           = useState([]);
  const [selIds, setSelIds]       = useState([]);

  useEffect(() => {
    if (!open) return;
    getAllAccounts()          // hàm đã tạo trước đó
      .then((r) => setRows(r.data.data))
      .catch(() => enqueueSnackbar('Lỗi tải account', { variant: 'error' }));
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chọn tài khoản để phân công</DialogTitle>

      <DialogContent dividers>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'idAccount',   headerName: 'ID',  width: 80 },
            { field: 'accountName', headerName: 'Account', width: 180 },
            { field: 'isLocked',    headerName: 'Khoá?',  width: 90, type: 'boolean' },
          ]}
          checkboxSelection
          autoHeight
          getRowId={(r) => r.idAccount}
          onRowSelectionModelChange={(selection) => {
            const selectedIds = Array.from(selection?.ids ?? []);
            setSelIds(selectedIds);
          }}

        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          onClick={() => { onPick([...selIds]); }}
          disabled={selIds.length === 0}
        >
          Gán
        </Button>
      </DialogActions>
    </Dialog>
  );
}
