import axios from './axiosClient';

/* helper: ép mọi giá trị → mảng số duy nhất */
const toArr = (v) =>
  [...new Set((Array.isArray(v) ? v : v ? [v] : []).map(Number))]
    .filter((x) => !isNaN(x));

export const rddApi = {
  /* ngày khởi hành theo route (CLIENT) */
  listByRoute: (idRoute) =>
    axios.get(`/routerdeparturedateclient/${idRoute}`)
         .then((r) => r.data),

  /* thêm ngày khởi hành */
  create: (idRoute, body) =>
    axios.post(`/route-departure-date/${idRoute}`, body)
         .then((r) => r.data),

  /* cập nhật status */
  updateStatus: (idRDD, status) =>
    axios.put(`/route-departure-date/${idRDD}/status`, { status })
         .then((r) => r.data),

  /* xoá ngày khởi hành */
  remove: (idRDD) =>
    axios.delete(`/route-departure-date/${idRDD}`)
         .then((r) => r.data),
};

export const routeStopAssignApi = {
  /* GET list busStop thuộc 1 Route (bao gồm busRoute info) */
  listStopOfRoute: (idRoute) =>
    axios.get(`/busroute/${idRoute}`).then((r) => r.data),

  /* PUT gán danh sách busStop vào route */
  updateStopList: (idRoute, idBusStopList) =>
    axios.put(`/busroute/${idRoute}/busstop`, { idBusStopList: toArr(idBusStopList) })
         .then((r) => r.data),
    /* Xoá danh sách busStop khỏi route (DELETE) */
  deleteStops: (idRoute, idBusStopList) =>
    axios.delete(`/busroute/${idRoute}/busstop`,
                 { data: { idBusStopList: toArr(idBusStopList) } })
         .then((r) => r.data),
};

export const stopApiAll = () =>
  axios.get('/busstop').then((r) => r.data.data);
