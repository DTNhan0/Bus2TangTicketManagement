import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export default function RowFormDialog({
  open, mode, columns, initData, onClose, onSubmit,
}) {
  const [form, setForm] = useState({});

  useEffect(() => { setForm(initData || {}); }, [initData]);

  const editableCols = columns.filter((c) => c.editable !== false);

  const renderField = (col) => {
    const val = form[col.field];

     // Xử lý radio Khoá/Mở
    if (col.field === 'isLocked') {
      return (
        <>
          <div style={{ fontSize: 14, marginBottom: 4 }}>{col.headerName}</div>
          <RadioGroup
            row
            value={val ? 'true' : 'false'}
            onChange={(e) => setForm({ ...form, [col.field]: e.target.value === 'true' })}
          >
            <FormControlLabel value="true" control={<Radio size="small" />} label="Khoá" />
            <FormControlLabel value="false" control={<Radio size="small" />} label="Mở" />
          </RadioGroup>
        </>
      );
    }

    /* Date */
    if (col.type === 'date') {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={col.headerName}
            format="DD-MM-YYYY"
            value={val ? dayjs(val, 'DD-MM-YYYY') : null}
            onChange={(v) =>
              setForm({ ...form, [col.field]: v ? v.format('DD-MM-YYYY') : null })}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
        </LocalizationProvider>
      );
    }

    /* Boolean (Nam/Nữ) */
    if (col.type === 'boolean') {
      return (
        <>
          <div style={{ fontSize: 14, marginBottom: 4 }}>{col.headerName}</div>
          <RadioGroup
            row
            value={val === true ? 'true' : val === false ? 'false' : ''}
            onChange={(e) => setForm({ ...form, [col.field]: e.target.value === 'true' })}
          >
            <FormControlLabel value="true"  control={<Radio size="small" />} label="Nam" />
            <FormControlLabel value="false" control={<Radio size="small" />} label="Nữ" />
          </RadioGroup>
        </>
      );
    }

    /* Text */
    return (
      <TextField
        label={col.headerName}
        fullWidth
        size="small"
        multiline={!!col.multiline}
        value={val ?? ''}
        InputProps={{ readOnly: mode === 'detail' || col.readOnly }}
        onChange={(e) => setForm({ ...form, [col.field]: e.target.value })}
      />
    );
  };


  return (
    <Dialog open={open} maxWidth="md" fullWidth onClose={onClose}>
      <DialogTitle>{mode === 'add' ? 'Thêm mới' : mode === 'edit' ? 'Cập nhật' : 'Chi tiết'}</DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {editableCols.map((col) => (
            <Grid item xs={12} sm={6} key={col.field}>
              {renderField(col)}
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        {mode !== 'detail' && (
          <Button variant="contained" onClick={() => onSubmit(form)}>
            {mode === 'add' ? 'Thêm' : 'Cập nhật'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
