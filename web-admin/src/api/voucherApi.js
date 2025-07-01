import axios from './axiosClient';

/* helper hiển thị thông báo lỗi BE */
const unwrap = (p) =>
  p.then((r) => {
    const { status, message, data } = r.data;
    if (status !== 'SUCCESS') throw new Error(message || 'Thao tác thất bại');
    return { message, data };
  });

export const voucherApi = {
  /* Lấy toàn bộ voucher → data = [] */
  getAll: () => unwrap(axios.get('/voucher')).then((rs) => rs.data),

  /* Tạo voucher mới → trả lại record vừa tạo */
  create: (dto) => unwrap(axios.post('/voucher', dto)).then((rs) => rs.data),

  /* Xoá voucher theo code → trả lại record đã xoá */
  delete: (code) => unwrap(axios.delete(`/voucher/${code}`)).then((rs) => rs.data),
};
