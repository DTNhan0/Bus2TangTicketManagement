import { useEffect, useState } from 'react';
import { Box, Button, Stack, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { routeApi } from '../../api/routeStopApi';
import { assignmentApi } from '../../api/assignmentApi';
import { useSnackbar } from 'notistack';
import AccountPickerDialog from './AccountPickerDialog';

export default function AssignmentPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [routes,   setRoutes]   = useState([]);
  const [selRoute, setSelRoute] = useState(null);

  const [accRows,   setAccRows]   = useState([]);
  const [selAccIds, setSelAccIds] = useState([]);

  const [pickerOpen, setPickOpen] = useState(false);

  /* ------ helper hiển thị message từ BE ------ */
  const showMsg = ({ status, message }) =>
    enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });

  /* tải tất cả tuyến */
  useEffect(() => {
    routeApi.getAll()
      .then((r) => setRoutes(r.data.data))
      .catch(() => enqueueSnackbar('Lỗi tải tuyến', { variant: 'error' }));
  }, []);

  /* tải account theo route */
  const loadAssignment = async (route) => {
    if (!route) { setAccRows([]); return; }
    try {
      const res = await assignmentApi.listByRoute(route.idBusRoute);
      showMsg(res);                        // thông báo SUCCESS / FAILED
      setAccRows(res.data?.accountList ?? []);
    } catch {
      enqueueSnackbar('Lỗi tải assignment', { variant: 'error' });
    }
  };
  useEffect(() => { loadAssignment(selRoute); }, [selRoute]);

  /* ---------- Thêm phân công ---------- */
  const handleAddAccount = async (ids) => {
    if (!ids.length) return;
    try {
      const res = await assignmentApi.addMany(selRoute.idBusRoute, ids);
      showMsg(res);
      if (res.status === 'SUCCESS') {
        setPickOpen(false);
        loadAssignment(selRoute);
      }
    } catch (e) {
      showMsg(e.response?.data ?? { status: 'FAILED', message: 'Lỗi phân công' });
    }
  };

  /* ---------- Xoá phân công ---------- */
  const handleRemove = async () => {
    if (!selAccIds.length) return;
    try {
      const res = await assignmentApi.removeMany(selRoute.idBusRoute, selAccIds);
      showMsg(res);
      if (res.status === 'SUCCESS') {
        setSelAccIds([]);
        loadAssignment(selRoute);
      }
    } catch (e) {
      showMsg(e.response?.data ?? { status: 'FAILED', message: 'Lỗi xoá' });
    }
  };

  return (
    <Box>
      {/* BẢNG TUYẾN XE */}
      <Box sx={{ height: 340, mb: 3 }}>
        <DataGrid
          rows={routes}
          columns={[
            { field: 'idBusRoute', headerName: 'ID', width: 70 },
            { field: 'busRouteName', headerName: 'Tên tuyến', width: 260 },
            {
              field: 'isAvailable', headerName: 'TT', width: 90,
              renderCell: (p) => (
                <Chip label={p.value ? 'OK' : 'Tạm'} color={p.value ? 'success' : 'error'} size="small" />
              ),
            },
          ]}
          getRowId={(r) => r.idBusRoute}
          onRowClick={(p) => setSelRoute(p.row)}
          sx={{ cursor: 'pointer' }}
        />
      </Box>

      {/* NÚT Thêm / Xoá */}
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <Button variant="contained" disabled={!selRoute} onClick={() => setPickOpen(true)}>
          Thêm phân công
        </Button>
        <Button variant="outlined" color="error"
          disabled={!selRoute || selAccIds.length === 0}
          onClick={handleRemove}>
          Xoá phân công
        </Button>
      </Stack>

      {/* BẢNG ACCOUNT ĐÃ GÁN */}
      <DataGrid
        rows={accRows}
        columns={[
          { field: 'idAccount', headerName: 'ID', width: 80 },
          { field: 'accountName', headerName: 'Account', width: 180 },
          { field: 'isLocked', headerName: 'Khoá?', width: 90, type: 'boolean' },
          {
            field: 'permissionGroup', headerName: 'Nhóm quyền', width: 160,
            valueGetter: (v) => v?.permissionName ?? '(Chưa)',
          },
        ]}
        checkboxSelection
        getRowId={(r) => r.idAccount}
        autoHeight
        /* KHÔNG dùng prop điều khiển; chỉ lắng nghe sự kiện chọn  */
        onRowSelectionModelChange={(selection) => {
          /* Ở MUI v7 selection là Set, ở v5 là Array -->
             Đưa về mảng số duy nhất */
          const ids = Array.isArray(selection)
            ? selection
            : Array.from(selection?.ids ?? selection ?? []);
          setSelAccIds(ids.map(Number));
        }}
      />

      {/* PICKER */}
      <AccountPickerDialog
        open={pickerOpen}
        onClose={() => setPickOpen(false)}
        onPick={handleAddAccount}
      />
    </Box>
  );
}
