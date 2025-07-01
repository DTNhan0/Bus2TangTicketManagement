import DataTable from '../table/DataTable';
import SettingsIcon from '@mui/icons-material/Settings';
import { Tooltip, IconButton } from '@mui/material';

/* ----- Cột hiển thị Tài khoản (đã fix valueGetter) ----- */
const columns = [
  { field: 'idAccount',   headerName: 'ID',        width: 70 },
  { field: 'accountName', headerName: 'Account',   width: 140 },
  { field: 'password',    headerName: 'Mật khẩu',  width: 140, type: 'password' },
  { field: 'isLocked',    headerName: 'Bị khoá',     width: 90,  type: 'boolean' },

  /* Giữ field = permissionGroup, lấy tên nhóm bằng valueGetter */
  {
    field: 'permissionGroup',
    headerName: 'Nhóm quyền',
    width: 160,
    valueGetter: (value) => {return value?.permissionName ?? '(Chưa phân quyền)'}
  },
];

/* ----- Component bảng ----- */
export default function AccountTable({ onPermission, ...rest }) {
  return (
    <DataTable
      {...rest}
      columns={columns}
      getRowId={(r) => r.idAccount}
      extraAction={(row) => (
        <Tooltip title="Phân quyền">
          <IconButton size="small" color="secondary" onClick={() => onPermission(row)}>
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      )}
    />
  );
}
