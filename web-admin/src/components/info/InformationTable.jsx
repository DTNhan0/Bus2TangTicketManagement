import DataTable from '../table/DataTable';

/* Cột đầy đủ – Giới tính hiển thị Nam/Nữ */
const columns = [
  { field: 'idInfo',           headerName: 'ID',         width: 70 },
  { field: 'cic',              headerName: 'CIC',        width: 130 },
  { field: 'firstName',        headerName: 'Họ',         width: 110 },
  { field: 'middleName',       headerName: 'Tên đệm',    width: 110 },
  { field: 'lastName',         headerName: 'Tên',        width: 110 },
  { field: 'dateOfBirth',      headerName: 'Ngày sinh',  width: 120 },
  {
    field: 'sex',
    headerName: 'Giới tính',
    width: 90,
    valueGetter: (value) => value ? 'Nam' : 'Nữ'
  },
  { field: 'permanentAddress', headerName: 'Địa chỉ',    width: 200 },
  { field: 'phoneNumber',      headerName: 'SĐT',        width: 120 },
  { field: 'email',            headerName: 'Email',      width: 160 },
];

export default function InformationTable(props) {
  return (
    <DataTable
      {...props}
      columns={columns}
      getRowId={(r) => r.idInfo}
    />
  );
}
