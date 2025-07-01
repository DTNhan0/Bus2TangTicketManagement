import axios from './axiosClient';

// API cho tuyến xe
export const routeApi = {
  getAll: () => axios.get('/busroute'),
  create: (data) => axios.post('/busroute', data),
  update: (id, data) => axios.put(`/busroute/${id}`, data),
  delete: (id) => axios.delete(`/busroute/${id}`)
};

// API cho điểm dừng
export const stopApi = {
  getAll: () => axios.get('/busstop'),
  create: (data) => axios.post('/busstop', data),
  update: (id, data) => axios.put(`/busstop/${id}`, data),
  delete: (id) => axios.delete(`/busstop/${id}`)
};

export const mediaFileApi = {
  list: ({idBusRoute, idBusStop}) =>
    axios.get('/mediafiles', { params: { idBusRoute, idBusStop } })
      .then(res => res.data.data),
  fetch: (id) =>
    axios.get(`/mediafiles/${id}`, { responseType: 'blob' })
      .then(res => URL.createObjectURL(res.data)),
  uploadSingle: ({idBusRoute, idBusStop, fileName, file}) => {
    const form = new FormData();
    if (idBusRoute != null) form.append('idBusRoute', idBusRoute);
    if (idBusStop != null)  form.append('idBusStop', idBusStop);
    form.append('fileName', fileName);
    form.append('file', file);
    return axios.post('/mediafiles', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) =>
    axios.delete(`/mediafiles/${id}`)
      .then(res => res.data.data)
};