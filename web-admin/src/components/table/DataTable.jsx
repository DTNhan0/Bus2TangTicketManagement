import { DataGrid } from '@mui/x-data-grid';
import { Box, Stack, IconButton, Tooltip } from '@mui/material';
import DeleteIcon     from '@mui/icons-material/Delete';
import EditIcon       from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState }   from 'react';
import ConfirmDialog  from '../common/ConfirmDialog';

/* DataGrid chung – KHÔNG chứa RowFormDialog nội bộ nữa */
export default function DataTable({
  rows,
  columns,
  getRowId,
  onEdit,        // callback(row) mở modal ngoài
  onDelete,      // callback(row)
  onView,        // callback(row) (tùy chọn)
  extraAction,   // nút bổ sung
  onRowClick,    // chọn dòng
}) {
  const [openDel, setOpenDel] = useState(false);
  const [selRow,  setSelRow ] = useState(null);

  const actionCol = {
    field: 'actions',
    headerName: '',
    width: 130,
    sortable: false,
    filterable: false,
    align: 'center',
    renderCell: (params) => (
      <Stack direction="row" spacing={0}>
        {onView && (
          <Tooltip title="Xem chi tiết">
            <IconButton size="small" onClick={() => onView(params.row)}>
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}

        {onEdit && (
          <Tooltip title="Sửa">
            <IconButton size="small" color="primary" onClick={() => onEdit(params.row)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}

        {onDelete && (
          <Tooltip title="Xoá">
            <IconButton
              size="small"
              color="error"
              onClick={() => { setSelRow(params.row); setOpenDel(true); }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        )}

        {extraAction && extraAction(params.row)}
      </Stack>
    ),
  };

  return (
    <Box sx={{ height: 550, bgcolor: '#fff', p: 2, borderRadius: 2, boxShadow: 1 }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionCol]}
        getRowId={getRowId}
        pagination
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
        onRowClick={onRowClick}
      />

      {/* Confirm xoá */}
      {onDelete && (
        <ConfirmDialog
          open={openDel}
          title={`Xoá bản ghi ID = ${selRow ? getRowId(selRow) : ''}?`}
          onClose={() => setOpenDel(false)}
          onOK={() => { onDelete(selRow); setOpenDel(false); }}
        />
      )}
    </Box>
  );
}
