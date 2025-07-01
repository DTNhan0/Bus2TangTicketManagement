import { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { getPermissionGroups, updateAccountGroup } from '../../api/accountApi';
import { useSnackbar } from 'notistack';

export default function PermissionDialog({ open, idAcc, currentGroupId, onClose, onSuccess }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(currentGroupId || 0);
  const { enqueueSnackbar } = useSnackbar();

  // Load danh sách nhóm quyền
  useEffect(() => {
    if (!open) return;
    getPermissionGroups()
      .then((res) => {
        const { status, message, data } = res.data;
        enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
        if (status === 'SUCCESS') setGroups(data);
      })
      .catch(() => enqueueSnackbar('Lỗi mạng', { variant: 'error' }));
  }, [open]);

  // Xử lý cập nhật
  const handleSave = async () => {
    try {
      const res = await updateAccountGroup(idAcc, selectedGroup === 0 ? null : selectedGroup);
      const { status, message } = res.data;
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      if (status === 'SUCCESS') {
        onSuccess();
        onClose();
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Lỗi hệ thống', { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Phân quyền tài khoản</DialogTitle>

      <DialogContent dividers>
        <FormControl fullWidth size="small">
          <InputLabel>Nhóm quyền</InputLabel>
          <Select
            value={selectedGroup}
            label="Nhóm quyền"
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <MenuItem value={0}>(Không nhóm)</MenuItem>
            {groups.map((g) => (
              <MenuItem key={g.idPerGroup} value={g.idPerGroup}>
                {g.permissionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
