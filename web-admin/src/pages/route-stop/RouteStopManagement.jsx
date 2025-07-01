import { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import RouteTable from '../../components/route-stop/RouteTable';
import StopTable from '../../components/route-stop/StopTable';
import {routeApi, stopApi} from '../../api/routeStopApi';
import { useSnackbar } from 'notistack';

export default function RouteStopManagement() {
  const { enqueueSnackbar } = useSnackbar();
  const [tabValue, setTabValue] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const loadData = async () => {
    try {
      const [resRoutes, resStops] = await Promise.all([
        routeApi.getAll(),
        stopApi.getAll()
      ]);
      setRoutes(resRoutes.data.data);
      setStops(resStops.data.data);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Lỗi tải dữ liệu', { variant: 'error' });
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)} sx={{ mb: 3 }}>
        <Tab label="Danh sách tuyến xe" />
        <Tab label="Danh sách điểm dừng" />
      </Tabs>

      {tabValue === 0 && <RouteTable data={routes} onRefresh={loadData} />}
      {tabValue === 1 && <StopTable data={stops} onRefresh={loadData} />}
    </Box>
  );
}
