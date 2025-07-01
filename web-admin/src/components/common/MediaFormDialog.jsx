import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, InputLabel
} from '@mui/material';

/*  Form thêm / sửa 1 media file  */
export default function MediaFormDialog({ open, initData, onClose, onSubmit }) {
  const [form, setForm] = useState({ fileName: '', fileType: '', file: null });

  useEffect(() => {
    setForm(initData
      ? { fileName: initData.fileName, fileType: initData.fileType, file: null }
      : { fileName: '', fileType: '', file: null });
  }, [initData]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initData ? 'Sửa Media' : 'Thêm Media'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Tên file"
          fullWidth
          margin="normal"
          value={form.fileName}
          onChange={(e) => setForm({ ...form, fileName: e.target.value })}
        />
        <TextField
          label="Loại file (vd: image/jpeg)"
          fullWidth
          margin="normal"
          value={form.fileType}
          onChange={(e) => setForm({ ...form, fileType: e.target.value })}
        />

        <InputLabel sx={{ mt: 2 }}>Chọn file</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(form)}
          disabled={!form.fileName || !form.file}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
