import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { rddApi } from '../../api/routePlanningApi';
import { useSnackbar } from 'notistack';

export default function RDDAddDialog({ open, idRoute, onClose, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState(dayjs());
  const [seats,setSeats]= useState(0);

  const handleSave = async () => {
    try {
      const res = await rddApi.create(idRoute, {
        date : date.format('YYYY-MM-DD'),
        numberOfSeats: seats,
        status: false
      });
      enqueueSnackbar(res.message, { variant: res.status === 'SUCCESS' ? 'success' : 'error' });
      if (res.status === 'SUCCESS') {
        onSuccess();
        onClose();
      }
    } catch (e) {
      enqueueSnackbar('Lỗi thêm ngày khởi hành', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm ngày khởi hành cho tuyến #{idRoute}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 280 }}>
          <DatePicker
            label="Ngày khởi hành"
            value={date}
            onChange={(v) => setDate(v)}
            format="DD/MM/YYYY"
          />
          <TextField
            label="Số ghế"
            type="number"
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value || 0, 10))}
            inputProps={{ min: 0 }}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSave}
                disabled={!date || seats <= 0}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
