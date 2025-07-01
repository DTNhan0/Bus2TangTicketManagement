import { useEffect, useState } from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import {
  getAllInformation,
  createInformation,
  updateInformation,
  deleteInformation,
} from '../../api/informationApi';
import {
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../../api/accountApi';
import InformationTable from '../../components/info/InformationTable';
import AccountTable from '../../components/account/AccountTable';
import InformationForm from '../../components/info/InformationForm';
import AccountForm from '../../components/account/AccountForm';
import PermissionDialog from '../../components/common/PermissionDialog';
import { useSnackbar } from 'notistack';
import { extractStatusMessage } from '../../utils/apiUtils';

export default function InfoAndAccount() {
  const [infos, setInfos] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  const [displayedAccounts, setDisplayedAccounts] = useState([]);

  const [infoDlg, setInfoDlg] = useState({ open: false, mode: 'add', data: {} });
  const [accDlg, setAccDlg] = useState({ open: false, mode: 'add', data: {} });
  const [permDlg, setPermDlg] = useState({ open: false, idAcc: null });

  const { enqueueSnackbar } = useSnackbar();

  // Load danh sách information
  const loadInfos = async () => {
    try {
      const res = await getAllInformation();
      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      if (status === 'SUCCESS') setInfos(res.data.data);
    } catch (err) {
      const { status, message } = extractStatusMessage(err);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
    }
  };

  // Load toàn bộ account
  const loadAllAccounts = async () => {
    try {
      const res = await getAllAccounts();
      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      if (status === 'SUCCESS') {
        setAllAccounts(res.data.data);
        setDisplayedAccounts(res.data.data);
      }
    } catch (err) {
      enqueueSnackbar('Lỗi tải danh sách account', { variant: 'error' });
    }
  };

  useEffect(() => {
    loadInfos();
    loadAllAccounts();
  }, []);

  // Xử lý chọn information
  const handleSelectInfo = (info) => {
    setSelectedInfo(info);
    
    if (info?.idInfo) {
      const filtered = allAccounts.filter(acc => 
        acc.information?.idInfo === info.idInfo
      );
      setDisplayedAccounts(filtered);
    } else {
      setDisplayedAccounts(allAccounts);
    }
  };

  // Xử lý CRUD information
  const handleInfoSubmit = async (mode, body) => {
    try {
      const res =
        mode === 'add'
          ? await createInformation(body)
          : await updateInformation(infoDlg.data.idInfo, body);

      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      
      if (status === 'SUCCESS') {
        setInfoDlg({ ...infoDlg, open: false });
        loadInfos();
      }
    } catch (err) {
      const { status, message } = extractStatusMessage(err);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
    }
  };

  const handleInfoDelete = async (row) => {
    try {
      const res = await deleteInformation(row.idInfo);
      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      
      if (status === 'SUCCESS') {
        if (selectedInfo?.idInfo === row.idInfo) {
          setSelectedInfo(null);
          setDisplayedAccounts(allAccounts);
        }
        loadInfos();
      }
    } catch (err) {
      const { status, message } = extractStatusMessage(err);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
    }
  };

  // Xử lý CRUD account
  const handleAccSubmit = async (mode, body) => {
    if (!selectedInfo) {
      enqueueSnackbar('Vui lòng chọn thông tin trước', { variant: 'warning' });
      return;
    }
    
    try {
      const res =
        mode === 'add'
          ? await createAccount(selectedInfo.idInfo, body)
          : await updateAccount(accDlg.data.idAccount, body);

      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      
      if (status === 'SUCCESS') {
        setAccDlg({ ...accDlg, open: false });
        loadAllAccounts();
        handleSelectInfo(selectedInfo); // Refresh filtered list
      }
    } catch (err) {
      const { status, message } = extractStatusMessage(err);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
    }
  };

  const handleAccDelete = async (row) => {
    try {
      const res = await deleteAccount(row.idAccount);
      const { status, message } = extractStatusMessage(res);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
      
      if (status === 'SUCCESS') {
        loadAllAccounts();
        handleSelectInfo(selectedInfo); // Refresh filtered list
      }
    } catch (err) {
      const { status, message } = extractStatusMessage(err);
      enqueueSnackbar(message, { variant: status === 'SUCCESS' ? 'success' : 'error' });
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Phần Information */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Button
            variant="contained"
            onClick={() => setInfoDlg({ open: true, mode: 'add', data: {} })}
          >
            Thêm thông tin
          </Button>
        </Stack>
        
        <InformationTable
          rows={infos}
          onEdit={(row) => setInfoDlg({ open: true, mode: 'edit', data: row })}
          onDelete={handleInfoDelete}
          onRowClick={({ row }) => handleSelectInfo(row)}
        />
      </Grid>

      {/* Phần Account */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Button
            variant="outlined"
            onClick={() => handleSelectInfo(null)}
            disabled={!selectedInfo}
          >
            Hiển thị tất cả
          </Button>
          
          <Button
            variant="contained"
            onClick={() => {
              if (!selectedInfo) {
                enqueueSnackbar('Vui lòng chọn thông tin trước', { variant: 'warning' });
                return;
              }
              setAccDlg({ open: true, mode: 'add', data: {} });
            }}
            disabled={!selectedInfo}
          >
            Thêm tài khoản
          </Button>
        </Stack>
        
        <AccountTable
          rows={displayedAccounts}
          onEdit={(row) => setAccDlg({ open: true, mode: 'edit', data: row })}
          onDelete={handleAccDelete}
          onPermission={(row) => setPermDlg({ open: true, idAcc: row.idAccount })}
        />
      </Grid>

      {/* Dialog forms */}
      <InformationForm
        open={infoDlg.open}
        mode={infoDlg.mode}
        initData={infoDlg.data}
        onClose={() => setInfoDlg({ ...infoDlg, open: false })}
        onSubmit={(data) => handleInfoSubmit(infoDlg.mode, data)}
      />

      <AccountForm
        open={accDlg.open}
        mode={accDlg.mode}
        initData={accDlg.data}
        onClose={() => setAccDlg({ ...accDlg, open: false })}
        onSubmit={(data) => handleAccSubmit(accDlg.mode, data)}
      />

      <PermissionDialog
        open={permDlg.open}
        idAcc={permDlg.idAcc}
        onClose={() => setPermDlg({ open: false, idAcc: null })}
        onSuccess={() => {
          loadAllAccounts();
          if (selectedInfo) handleSelectInfo(selectedInfo);
        }}
      />
    </Grid>
  );
}
