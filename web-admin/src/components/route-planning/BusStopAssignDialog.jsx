import { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Stack, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { stopApiAll, routeStopAssignApi } from '../../api/routePlanningApi';
import { useSnackbar } from 'notistack';

export default function BusStopAssignDialog({ open, idRoute, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [allStops,  setAllStops]  = useState([]);
  const [routeStop, setRouteStop] = useState([]);

  const [selAllIds,  setSelAll]   = useState([]);
  const [selRouteIds,setSelRoute] = useState([]);

  /* helper snackbar */
  const toast = (res) =>
    enqueueSnackbar(res.message, { variant: res.status === 'SUCCESS' ? 'success' : 'error' });

  /* load toàn bộ busStop + busStop đã gán */
  useEffect(() => {
    if (!open) return;
    stopApiAll().then(setAllStops);

    routeStopAssignApi.listStopOfRoute(idRoute)
      .then((res) => {
        toast(res);
        setRouteStop(res.data.busStopList ?? []);
      })
      .catch(() => enqueueSnackbar('Lỗi tải điểm dừng', { variant: 'error' }));
  }, [open, idRoute]);

  /* =========== action ADD / REMOVE =========== */
  const handleAdd = async () => {
    const ids = selAllIds.filter((id) => !routeStop.some((s) => s.idBusStop === id));
    if (!ids.length) return;
    const res = await routeStopAssignApi.updateStopList(idRoute,
                        [...ids, ...routeStop.map((s) => s.idBusStop)]);
    toast(res);
    if (res.status === 'SUCCESS')
      setRouteStop(res.data.busStopList ?? []);
  };

    const handleRemove = async () => {
    if (!selRouteIds.length) return;

    const res = await routeStopAssignApi.deleteStops(idRoute, selRouteIds);
    toast(res);
    if (res.status === 'SUCCESS')
        setRouteStop(res.data.busStopList ?? []);
    };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth onClose={onClose}>
      <DialogTitle>Quản lý điểm dừng tuyến #{idRoute}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* bảng ALL */}
          <Grid item xs={6}>
            <Typography variant="subtitle2">Tất cả điểm dừng</Typography>
            <DataGrid
              rows={allStops}
              columns={[
                { field: 'idBusStop', headerName: 'ID', width: 70 },
                { field: 'busStopName', headerName: 'Tên', width: 220 },
              ]}
              autoHeight checkboxSelection
              getRowId={(r) => r.idBusStop}
              onRowSelectionModelChange={(selection) => {
                /* v7: selection.ids (Set) – v5: Array */
                const ids = Array.isArray(selection)
                    ? selection
                    : Array.from(selection?.ids ?? []);
                setSelAll(ids.map(Number));
              }}
            />
          </Grid>

          {/* bảng thuộc route */}
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Button variant="contained" onClick={handleAdd} disabled={!selAllIds.length}>
                Thêm &gt;&gt;
              </Button>
              <Button variant="outlined" color="error"
                      onClick={handleRemove} disabled={!selRouteIds.length}>
                &lt;&lt;  Xoá
              </Button>
            </Stack>

            <Typography variant="subtitle2">Điểm dừng của tuyến</Typography>
            <DataGrid
              rows={routeStop}
              columns={[
                { field: 'idBusStop', headerName: 'ID', width: 70 },
                { field: 'busStopName', headerName: 'Tên', width: 220 },
              ]}
              autoHeight checkboxSelection
              getRowId={(r) => r.idBusStop}
                 onRowSelectionModelChange={(selection) => {
                   const ids = Array.isArray(selection)
                     ? selection
                     : Array.from(selection?.ids ?? []);
                   setSelRoute(ids.map(Number));
                 }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
