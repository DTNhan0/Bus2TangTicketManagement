import axios from './axiosClient';

/* unwrap BE (trả {status,message,data})  */
const unwrap = (p) =>
  p.then((r) => r.data).then(({ status, message, data }) => {
    if (status !== 'SUCCESS') throw new Error(message || 'Thao tác thất bại');
    return { message, data };
  });

export const invoiceApi = {
  /* danh sách hoá đơn mở rộng */
  getAll: () =>
    unwrap(axios.get('/invoiceextend')).then((rs) => rs.data),

  /* chi tiết 1 hoá đơn mở rộng */
  getDetail: (idInvoice) =>
    unwrap(axios.get(`/invoiceextend/${idInvoice}/invoicedetailextend`))
      .then((rs) => rs.data),

  /* cập nhật status */
  updateStatus: (idInvoice, status) =>
    unwrap(axios.put(`/invoice/${idInvoice}/status`, { status }))
      .then((rs) => rs.data),
};
