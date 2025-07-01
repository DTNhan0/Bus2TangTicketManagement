// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import { SnackbarProvider } from 'notistack';
import AdminLayout from './components/layout/AdminLayout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

import Dashboard from './pages/Dashboard';
import InfoAndAccount from './pages/info-account/InfoAndAccount';
import RouteStopManagement from './pages/route-stop/RouteStopManagement';
import AssignmentPage from './components/assignment/AssignmentPage';
import RoutePlanningPage from './components/route-planning/RoutePlanningPage';
import TicketPricePage from './components/ticket-price/TicketPricePage';
import VoucherManagement from './components/voucher/VoucherManagement';
import InvoiceManagement from './components/invoice/InvoiceManagement';
import Statistic from './components/statistic/Statistic';

import DashboardIcon            from '@mui/icons-material/Dashboard';
import ManageAccountsIcon       from '@mui/icons-material/ManageAccounts';
import AltRouteIcon             from '@mui/icons-material/AltRoute';
import AssignmentIndIcon        from '@mui/icons-material/AssignmentInd';
import TimelineIcon             from '@mui/icons-material/Timeline';
import ConfirmationNumberIcon   from '@mui/icons-material/ConfirmationNumber';
import LocalOfferIcon           from '@mui/icons-material/LocalOffer';
import ReceiptLongIcon          from '@mui/icons-material/ReceiptLong';

/* ───────── Component đăng xuất ───────── */
function Logout() {
  useEffect(() => {
    localStorage.removeItem('user');
    /* có thể remove thêm token, refreshToken … */
    window.location.replace('/login');   // chuyển hẳn tới trang login
  }, []);
  return null;
}

export default function App() {
  const menuItems = [
    { text: 'Dashboard',                     icon: <DashboardIcon />,            path: '/' },
    { text: 'Quản lý thông tin & tài khoản', icon: <ManageAccountsIcon />,       path: '/info-account' },
    { text: 'Quản lý tuyến & điểm dừng',     icon: <AltRouteIcon />,             path: '/route-stop' },
    { text: 'Quản lý phân công',             icon: <AssignmentIndIcon />,        path: '/assignment' },
    { text: 'Quản lý lộ trình',              icon: <TimelineIcon />,             path: '/route-planning' },
    { text: 'Quản lý loại vé',               icon: <ConfirmationNumberIcon />,   path: '/ticket-price' },
    { text: 'Quản lý voucher',               icon: <LocalOfferIcon />,           path: '/voucher' },
    { text: 'Quản lý hoá đơn',               icon: <ReceiptLongIcon />,          path: '/invoice' },
    { text: 'Thống kê',                      icon: <BarChartIcon />,             path: '/statistic' },
    { text: 'Đăng xuất',                     icon: <LogoutIcon />,               path: '/logout' },
  ];

  /* route chỉ cho phép khi đã đăng nhập */
  const PrivateRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <PrivateRoute
                  element={
                    <AdminLayout
                      user={JSON.parse(localStorage.getItem('user'))}
                      menu={menuItems}
                    />
                  }
                />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="info-account"   element={<InfoAndAccount />} />
              <Route path="route-stop"     element={<RouteStopManagement />} />
              <Route path="assignment"     element={<AssignmentPage />} />
              <Route path="route-planning" element={<RoutePlanningPage />} />
              <Route path="ticket-price"   element={<TicketPricePage />} />
              <Route path="voucher"        element={<VoucherManagement />} />
              <Route path="invoice"        element={<InvoiceManagement />} />
              <Route path="statistic"      element={<Statistic />} />
              <Route path="logout"         element={<Logout />} />        {/* NEW */}
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}
