import client from './axiosClient';

// Thêm hàm này vào
export const getPermissionGroups = () => client.get('/permission-group');

// Các hàm khác giữ nguyên
export const getAllAccounts = () => 
  client.get('/account').then(res => ({
    ...res,
    data: {
      ...res.data,
      data: res.data.data.map(acc => ({
        ...acc,
        information: acc.information || { idInfo: null } // Đảm bảo luôn có trường information
      }))
    }
  }));

export const getAccountsByInfo = (idInfo) => client.get(`/information/${idInfo}/account`);
export const createAccount = (idInfo, body) => client.post(`/account/${idInfo}`, body);
export const updateAccount = (idAcc, body) => client.put(`/account/${idAcc}`, body);
export const deleteAccount = (idAcc) => client.delete(`/account/${idAcc}`);
export const updateAccountGroup = (idAcc, idPerGroup) => 
  client.put(`/${idAcc}/permission`, { idPerGroup });
