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
import { routeApi } from '../../api/routeStopApi';

export default function RouteFormDialog({ open, mode = 'add', data, onClose, onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({});
  const isDetail = mode === 'detail';

  // 1. Sửa useEffect để tránh reset form không cần thiết
  useEffect(() => {
    if (open) {
      setForm(data ? { 
        // Copy toàn bộ data vào form
        busRouteName: data.busRouteName || '',
        overview: data.overview || '',
        description: data.description || '',
        highlights: data.highlights || '',
        included: data.included || '',
        excluded: data.excluded || '',
        whatToBring: data.whatToBring || '',
        beforeYouGo: data.beforeYouGo || '',
        isAvailable: data.isAvailable ?? true
      } : {
        // Giá trị mặc định khi thêm mới
        busRouteName: '',
        overview: '',
        description: '',
        highlights: '',
        included: '',
        excluded: '',
        whatToBring: '',
        beforeYouGo: '',
        isAvailable: true
      });
    }
  }, [open, data]); // Chỉ chạy khi open hoặc data thay đổi

  const handleSubmit = async () => {
    try {
      const apiCall = data?.idBusRoute 
        ? routeApi.update(data.idBusRoute, form)
        : routeApi.create(form);
      
      await apiCall;
      enqueueSnackbar(data?.idBusRoute ? 'Cập nhật thành công' : 'Thêm thành công', { 
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
        {isDetail ? 'Chi tiết tuyến xe' : 
         data?.idBusRoute ? 'Cập nhật tuyến' : 'Thêm tuyến mới'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* 2. Xóa tất cả key động */}
          <TextField
            label="Tên tuyến xe"
            value={form.busRouteName || ''}
            onChange={(e) => !isDetail && setForm({ ...form, busRouteName: e.target.value })}
            fullWidth
            required
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Tổng quan"
            value={form.overview || ''}
            onChange={(e) => !isDetail && setForm({ ...form, overview: e.target.value })}
            multiline
            rows={3}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Mô tả"
            value={form.description || ''}
            onChange={(e) => !isDetail && setForm({ ...form, description: e.target.value })}
            multiline
            rows={4}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Điểm nổi bật"
            value={form.highlights || ''}
            onChange={(e) => !isDetail && setForm({ ...form, highlights: e.target.value })}
            multiline
            rows={3}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Bao gồm"
            value={form.included || ''}
            onChange={(e) => !isDetail && setForm({ ...form, included: e.target.value })}
            multiline
            rows={2}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Không bao gồm"
            value={form.excluded || ''}
            onChange={(e) => !isDetail && setForm({ ...form, excluded: e.target.value })}
            multiline
            rows={2}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Mang theo"
            value={form.whatToBring || ''}
            onChange={(e) => !isDetail && setForm({ ...form, whatToBring: e.target.value })}
            multiline
            rows={2}
            InputProps={{ readOnly: isDetail }}
          />

          <TextField
            label="Trước khi đi"
            value={form.beforeYouGo || ''}
            onChange={(e) => !isDetail && setForm({ ...form, beforeYouGo: e.target.value })}
            multiline
            rows={2}
            InputProps={{ readOnly: isDetail }}
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
            disabled={!form.busRouteName?.trim()}
          >
            {data?.idBusRoute ? 'Cập nhật' : 'Thêm'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
