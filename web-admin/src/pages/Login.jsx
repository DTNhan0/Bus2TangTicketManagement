import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeLogin } from '../api/authApi';
import { Box, Button, TextField, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await fakeLogin(form);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ p: 4, width: 320 }} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>Đăng nhập</Typography>
        <TextField fullWidth label="Tài khoản" margin="normal"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}/>
        <TextField fullWidth type="password" label="Mật khẩu" margin="normal"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Đăng nhập</Button>
      </Paper>
    </Box>
  );
}
