import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

export default function ConfirmDialog({ open, title, onOK, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button color="error" onClick={onOK}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
