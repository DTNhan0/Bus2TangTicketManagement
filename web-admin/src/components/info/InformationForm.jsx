import RowFormDialog from '../common/RowFormDialog';

/* Trường nhập cho Information */
const columns = [
  { field: 'cic',             headerName: 'CIC' },
  { field: 'firstName',       headerName: 'Họ' },
  { field: 'middleName',      headerName: 'Tên đệm' },
  { field: 'lastName',        headerName: 'Tên' },
  { field: 'dateOfBirth',     headerName: 'Ngày sinh', type: 'date' },
  { field: 'sex',             headerName: 'Giới tính', type: 'boolean' },
  { field: 'permanentAddress',headerName: 'Địa chỉ', multiline: true },
  { field: 'phoneNumber',     headerName: 'SĐT' },
  { field: 'email',           headerName: 'Email' },
];

export default function InformationForm(props) {
  return <RowFormDialog {...props} columns={columns} />;
}
