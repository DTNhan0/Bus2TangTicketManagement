import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Stack
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { stopApi } from '../../api/routeStopApi';

export default function StopFormDialog({ open, mode = 'add', data, onClose, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({});
  const isDetail = mode === 'detail';

  useEffect(() => {
    if (data) {
      setForm({
        busStopName: data.busStopName || '',
        introduction: data.introduction || '',
        address: data.address || '',
        stopOrder: data.stopOrder ?? 0,
        isAvailable: data.isAvailable ?? true
      });
    } else {
      setForm({
        busStopName: '',
        introduction: '',
        address: '',
        stopOrder: 0,
        isAvailable: true
      });
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const apiCall = data?.idBusStop 
        ? stopApi.update(data.idBusStop, form)
        : stopApi.create(form);
      
      await apiCall;
      enqueueSnackbar(data?.idBusStop ? 'Cập nhật thành công' : 'Thêm thành công', { 
        variant: 'success' 
      });
      onSuccess();
      onClose();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        {isDetail ? 'Chi tiết điểm dừng' : 
         data?.idBusStop ? 'Cập nhật điểm dừng' : 'Thêm điểm dừng mới'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Tên điểm dừng"
            value={form.busStopName || ''}
            onChange={(e) => !isDetail && setForm({ ...form, busStopName: e.target.value })}
            fullWidth
            required
            InputProps={{ readOnly: isDetail }}
          />
          
          <TextField
            label="Địa chỉ"
            value={form.address || ''}
            onChange={(e) => !isDetail && setForm({ ...form, address: e.target.value })}
            fullWidth
            required
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Giới thiệu"
            value={form.introduction || ''}
            onChange={(e) => !isDetail && setForm({ ...form, introduction: e.target.value })}
            multiline
            rows={4}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Thứ tự dừng"
            type="number"
            value={form.stopOrder ?? 0}
            onChange={(e) => !isDetail && setForm({ 
              ...form, 
              stopOrder: Math.max(0, parseInt(e.target.value) || 0) 
            })}
            fullWidth
            required
            InputProps={{ 
              readOnly: isDetail, 
              inputProps: { 
                min: -1,
                step: 1
              } 
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.isAvailable ?? false}
                onChange={(e) => !isDetail && setForm({ ...form, isAvailable: e.target.checked })}
                disabled={isDetail}
              />
            }
            label="Hoạt động"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{isDetail ? 'Đóng' : 'Huỷ'}</Button>
        {!isDetail && (
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!form.busStopName?.trim() || form.stopOrder === undefined}
          >
            {data?.idBusStop ? 'Cập nhật' : 'Thêm'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
