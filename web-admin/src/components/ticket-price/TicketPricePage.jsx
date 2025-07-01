import { useEffect, useState } from 'react';
import {
  Box, Button, Chip, Stack
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { routeApi } from '../../api/routeStopApi';
import { ticketPriceApi } from '../../api/ticketPriceApi';
import TicketPriceAddDialog from './TicketPriceAddDialog';
import { useSnackbar } from 'notistack';

export default function TicketPricePage() {
  const { enqueueSnackbar } = useSnackbar();

  /* tuyến xe */
  const [routes,  setRoutes]  = useState([]);
  const [selRoute,setSelRoute]= useState(null);

  /* ticketPrice list */
  const [tpRows, setTPRows]   = useState([]);

  /* dialog add */
  const [addOpen,setAddOpen]  = useState(false);

  /* toast helper */
  const toast = (res) =>
    enqueueSnackbar(res.message, { variant: res.status === 'SUCCESS' ? 'success' : 'error' });

  /* lấy tất cả tuyến */
  useEffect(() => {
    routeApi.getAll()
      .then((r) => setRoutes(r.data.data))
      .catch(() => enqueueSnackbar('Lỗi tải tuyến', { variant: 'error' }));
  }, []);

  /* load ticketPrice khi chọn route */
  const loadTP = async (route) => {
    if (!route) { setTPRows([]); return; }
    const res = await ticketPriceApi.listByRoute(route.idBusRoute);
    toast(res);
    setTPRows(res.data?.ticketPriceList ?? []);
  };
  useEffect(() => { loadTP(selRoute); }, [selRoute]);

  /* toggle status */
  const toggleStatus = async (row) => {
    const res = await ticketPriceApi.update(row.idTicketPrice, {
        parentPrice: row.parentPrice,
        childPrice : row.childPrice,
        ticketType : row.ticketType,
        status     : !row.status           // chỉ thay đổi cờ status
    });
    toast(res);
    if (res.status === 'SUCCESS') loadTP(selRoute);
  };

  /* delete */
  const removeTP = async (row) => {
    const res = await ticketPriceApi.remove(row.idTicketPrice);
    toast(res);
    if (res.status === 'SUCCESS') loadTP(selRoute);
  };

  const tpCols = [
    { field: 'idTicketPrice', headerName: 'ID', width: 70 },
    { field: 'ticketType', headerName: 'Loại', width: 120 },
    { field: 'parentPrice', headerName: 'Giá NL', width: 110, type: 'number' },
    { field: 'childPrice',  headerName: 'Giá TE', width: 110, type: 'number' },
    {
      field: 'status', headerName: 'TT', width: 90,
      renderCell: (p) => (
        <Chip label={p.value ? 'Mở' : 'Khoá'}
              color={p.value ? 'success' : 'error'} size="small" />
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
          onClick={() => removeTP(p.row)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* bảng tuyến xe */}
      <Box sx={{ height: 330, mb: 2 }}>
        <DataGrid
          rows={routes}
          columns={[
            { field: 'idBusRoute', headerName: 'ID', width: 70 },
            { field: 'busRouteName', headerName: 'Tên tuyến', width: 260 },
            {
              field: 'isAvailable', headerName: 'TT', width: 90,
              renderCell: (p) => (
                <Chip label={p.value ? 'OK' : 'Tạm'}
                      color={p.value ? 'success':'error'} size="small"/>
              ),
            },
          ]}
          getRowId={(r) => r.idBusRoute}
          onRowClick={(p) => setSelRoute(p.row)}
          sx={{ cursor: 'pointer' }}
        />
      </Box>

      {/* nút thêm */}
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Button variant="contained" disabled={!selRoute}
                onClick={() => setAddOpen(true)}>
          Thêm loại vé
        </Button>
      </Stack>

      {/* bảng ticketPrice */}
      <DataGrid
        rows={tpRows}
        columns={tpCols}
        autoHeight
        getRowId={(r) => r.idTicketPrice}
      />

      {/* dialog add */}
      <TicketPriceAddDialog
        open={addOpen}
        idRoute={selRoute?.idBusRoute}
        onClose={() => setAddOpen(false)}
        onSuccess={() => loadTP(selRoute)}
      />
    </Box>
  );
}
