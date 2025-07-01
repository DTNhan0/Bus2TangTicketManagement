import axios from './axiosClient';

/* wrapper: BE luôn trả {status,message,data} */
const unwrap = (p) =>
  p.then((r) => r.data).then(({ status, message, data }) => {
    if (status !== 'SUCCESS')
      throw new Error(message || 'Lỗi lấy thống kê');
    return { message, data };
  });

export const statisticApi = {
  getRevenue: (year) =>
    unwrap(axios.get('/statistics/revenue',       { params: { year } }))
      .then((rs) => rs.data),           // rs.data = mảng thống kê

  getMostTraveled: (year) =>
    unwrap(axios.get('/statistics/most-traveled', { params: { year } }))
      .then((rs) => rs.data),

  getMostCanceled: (year) =>
    unwrap(axios.get('/statistics/most-canceled', { params: { year } }))
      .then((rs) => rs.data),
};
