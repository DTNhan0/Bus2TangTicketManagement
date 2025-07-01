import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import { ticketPriceApi } from '../../api/ticketPriceApi';
import { useSnackbar } from 'notistack';

export default function TicketPriceAddDialog({ open, idRoute, onClose, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();

  const [parentPrice, setParent] = useState('');
  const [childPrice,  setChild ] = useState('');
  const [ticketType,  setType  ] = useState('');

  const toast = (res) =>
    enqueueSnackbar(res.message, { variant: res.status === 'SUCCESS' ? 'success' : 'error' });

  const handleSave = async () => {
    try {
      const res = await ticketPriceApi.create(idRoute, {
        parentPrice: parseFloat(parentPrice),
        childPrice : parseFloat(childPrice),
        ticketType,
      });
      toast(res);
      if (res.status === 'SUCCESS') {
        onSuccess();
        onClose();
        // reset
        setParent(''); setChild(''); setType('');
      }
    } catch {
      enqueueSnackbar('Lỗi thêm loại vé', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm loại vé cho tuyến #{idRoute}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 280 }}>
          <TextField
            label="Giá người lớn"
            type="number"
            value={parentPrice}
            onChange={(e) => setParent(e.target.value)}
          />
          <TextField
            label="Giá trẻ em"
            type="number"
            value={childPrice}
            onChange={(e) => setChild(e.target.value)}
          />
          <TextField
            label="Loại vé (48h / 24h …)"
            value={ticketType}
            onChange={(e) => setType(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!parentPrice || !childPrice || !ticketType}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
