import { useEffect, useState } from 'react';
import { Box, Button, Chip, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { routeApi } from '../../api/routeStopApi';
import { rddApi } from '../../api/routePlanningApi';
import BusStopAssignDialog from './BusStopAssignDialog';
import RDDAddDialog from './RDDAddDialog';
import { useSnackbar } from 'notistack';

export default function RoutePlanningPage() {
  const { enqueueSnackbar } = useSnackbar();

  /* route list + chọn */
  const [routes, setRoutes]   = useState([]);
  const [selRoute,setSelRoute]= useState(null);

  /* dialog busStop assign */
  const [assignOpen,setAssign]= useState(false);

  /* RDD list */
  const [rddRows, setRdd] = useState([]);
  const [selRDD,  setSelRDD] = useState(null);

  /* dialog add RDD */
  const [addOpen, setAddOpen] = useState(false);

  /* toast helper */
  const toast = (res) =>
    enqueueSnackbar(res.message, { variant: res.status === 'SUCCESS' ? 'success' : 'error' });

  /* load route */
  useEffect(() => {
    routeApi.getAll()
      .then((r) => setRoutes(r.data.data))
      .catch(() => enqueueSnackbar('Lỗi tải tuyến', { variant: 'error' }));
  }, []);

  /* load RDD khi chọn route */
  const loadRDD = async (route) => {
    if (!route) { setRdd([]); return; }
    const res = await rddApi.listByRoute(route.idBusRoute);
    toast(res);
    setRdd(res.data?.routerDepartureDateResponseList ?? []);
  };
  useEffect(() => { loadRDD(selRoute); }, [selRoute]);

  /* update status RDD */
  const toggleStatus = async (row) => {
    const res = await rddApi.updateStatus(row.idRouteDepartureDate, !row.status);
    toast(res);
    if (res.status === 'SUCCESS') loadRDD(selRoute);
  };

  /* delete RDD */
  const deleteRDD = async (row) => {
    const res = await rddApi.remove(row.idRouteDepartureDate);
    toast(res);
    if (res.status === 'SUCCESS') loadRDD(selRoute);
  };

  /* cột RDD */
  const rddCols = [
    { field: 'idRouteDepartureDate', headerName: 'ID', width: 80 },
    { field: 'date', headerName: 'Ngày', width: 130 },
    { field: 'numberOfSeats', headerName: 'Ghế', width: 90, type: 'number' },
    {
      field: 'status', headerName: 'TT', width: 90,
      renderCell: (p) => (
        <Chip label={p.value ? 'Mở' : 'Khoá'}
              color={p.value ? 'success' : 'error'} size="small"/>
      ),
    },
    {
      field: 'actions', type: 'actions', width: 110,
      getActions: (p) => [
        <GridActionsCellItem
          icon={<Edit/>} label="Đổi"
          onClick={() => toggleStatus(p.row)}
        />,
        <GridActionsCellItem
          icon={<Delete color="error"/>} label="Xoá"
          onClick={() => deleteRDD(p.row)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* ========== ROUTE TABLE ========== */}
      <Box sx={{ height: 330, mb: 2 }}>
        <DataGrid
          rows={routes}
          columns={[
            { field: 'idBusRoute', headerName: 'ID', width: 70 },
            { field: 'busRouteName', headerName: 'Tên tuyến', width: 260 },
            {
              field: 'isAvailable', headerName: 'TT', width: 90,
              renderCell: (p) => (
                <Chip label={p.value ? 'OK' : 'Tạm'} color={p.value ? 'success':'error'} size="small"/>
              ),
            },
            {
              field: 'actions', type: 'actions', width: 70,
              getActions: (p) => [
                <GridActionsCellItem icon={<Edit/>} label="Điểm dừng"
                  onClick={() => { setSelRoute(p.row); setAssign(true); }}/>
              ],
            },
          ]}
          getRowId={(r) => r.idBusRoute}
          onRowClick={(p) => setSelRoute(p.row)}
        />
      </Box>

      {/* ========== BUTTON & RDD TABLE ========== */}
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Button variant="contained" disabled={!selRoute}
                onClick={() => setAddOpen(true)}>
          Thêm ngày khởi hành
        </Button>
      </Stack>

      <DataGrid
        rows={rddRows}
        columns={rddCols}
        autoHeight
        getRowId={(r) => r.idRouteDepartureDate}
        onRowSelectionModelChange={(m)=>setSelRDD(m[0])}
      />

      {/* DIALOGS */}
      <BusStopAssignDialog
        open={assignOpen}
        idRoute={selRoute?.idBusRoute}
        onClose={() => setAssign(false)}
      />

      <RDDAddDialog
        open={addOpen}
        idRoute={selRoute?.idBusRoute}
        onClose={() => setAddOpen(false)}
        onSuccess={() => loadRDD(selRoute)}
      />
    </Box>
  );
}
