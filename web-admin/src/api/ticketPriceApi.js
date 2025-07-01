import axios from './axiosClient';

/* helper: hiển thị message */
const unwrap = (p) => p.then((r) => r.data);

export const ticketPriceApi = {
  /* LẤY list ticketPrice của 1 route
     – BE mapping tại /busroute/hcm/{id} */
  listByRoute: (idRoute) =>
    unwrap(axios.get(`/busroute/hcm/${idRoute}`)),

  /* TẠO mới ticketPrice cho route */
  create: (idRoute, body) =>
    unwrap(axios.post(`/ticketprice/${idRoute}`, body)),

  update: (idTicketPrice, fullBody) =>
  unwrap(axios.put(`/ticketprice/${idTicketPrice}`, fullBody)),

  /* XOÁ 1 ticketPrice */
  remove: (idTicketPrice) =>
    unwrap(axios.delete(`/ticketprice/${idTicketPrice}`)),
};
