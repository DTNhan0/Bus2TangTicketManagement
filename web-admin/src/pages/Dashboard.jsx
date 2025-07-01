// src/pages/Dashboard.jsx
import { useMemo } from 'react';
import { Grid, Paper, Typography, Avatar, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RouteIcon from '@mui/icons-material/AltRoute';
import DiscountIcon from '@mui/icons-material/Discount';
import InsightsIcon from '@mui/icons-material/Insights';

export default function Dashboard() {
  /* Dữ liệu mẫu — sau này thay bằng API */
  const userInfo = {
    name: 'Nguyễn Văn A',
    role: 'Admin',
    email: 'admin@example.com',
  };

  /* card điều hướng */
  const quickLinks = [
    { label: 'Thông tin & Tài khoản', icon: <AccountCircleIcon />, to: '/info-account' },
    { label: 'Phân công',             icon: <AssignmentIcon />,    to: '/assignment' },
    { label: 'Lộ trình',              icon: <RouteIcon />,         to: '/route-planning' },
    { label: 'Loại vé',               icon: <InsightsIcon />,      to: '/ticket-price' },
    { label: 'Voucher',               icon: <DiscountIcon />,      to: '/voucher' },
  ];

  /* dữ liệu biểu đồ tròn (giả lập) */
  const pieData = useMemo(() => ([
    { name: 'Doanh thu', value: 75 },
    { name: 'Số vé',     value: 25 },
  ]), []);

  return (
    <Grid container spacing={2}>
      {/* ╔════════ góc trên-trái – Thông tin user ════════╗ */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64 }} />
          <div>
            <Typography variant="h6">{userInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo.role} • {userInfo.email}
            </Typography>
          </div>
        </Paper>
      </Grid>

      {/* ╔════════ góc trên-phải – Biểu đồ tròn ════════╗ */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Tỷ trọng Doanh thu / Vé (mẫu)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#1976d2" />
                <Cell fill="#ff9800" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* ╔════════ góc dưới-trái – Quick links ════════╗ */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Chức năng nhanh</Typography>
          <Stack spacing={1}>
            {quickLinks.map((item) => (
              <Button
                key={item.to}
                variant="outlined"
                startIcon={item.icon}
                component={RouterLink}
                to={item.to}
                sx={{ justifyContent: 'flex-start' }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Paper>
      </Grid>

      {/* ╔════════ góc dưới-phải – để trống / future ════════╗ */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.disabled',
          }}
        >
          <Typography>Đang cập nhật ...</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
