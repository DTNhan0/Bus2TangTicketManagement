import RowFormDialog from '../common/RowFormDialog';

const columns = [
  { field: 'accountName', headerName: 'Account' },
  { field: 'password',    headerName: 'Mật khẩu' },
  { 
    field: 'isLocked', 
    headerName: 'Trạng thái',
    type: 'boolean',
    labels: { true: 'Khoá', false: 'Mở' } // Thêm prop tùy chỉnh
  },
];

export default function AccountForm(props) {
  return <RowFormDialog {...props} columns={columns} />;
}
