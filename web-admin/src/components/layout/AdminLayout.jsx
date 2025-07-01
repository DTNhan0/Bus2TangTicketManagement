import {
  Box, CssBaseline, Drawer, Toolbar, AppBar, Typography,
  Divider, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Avatar
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminLayout({ user, menu }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top bar */}
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">Bus 2 Tầng Admin</Typography>
        </Toolbar>
      </AppBar>

      {/* Left menu */}
      <Drawer variant="permanent" sx={{ width: drawerWidth,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar />
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Avatar sx={{ mx: 'auto', mb: 1 }} />
          <Typography>{user.username}</Typography>
          <Typography variant="caption">{user.role}</Typography>
        </Box>
        <Divider />
          <List>
            {menu.map(({ text, icon, path }) => (
              <ListItem disablePadding key={text}>
                <ListItemButton onClick={() => navigate(path)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
