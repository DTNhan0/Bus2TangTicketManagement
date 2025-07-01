import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: { border: 0 },
        columnHeaders: { backgroundColor: '#f5f5f5', fontWeight: 600 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { background: '#1e293b', color: '#fff' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': { backgroundColor: '#0f172a' },
          '& .MuiSvgIcon-root': { color: '#38bdf8' },
        },
      },
    },
  },
});
