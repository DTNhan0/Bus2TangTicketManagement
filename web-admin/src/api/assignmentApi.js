import axios from './axiosClient';

/* ép mọi giá trị sang mảng số duy nhất */
const toArray = (v) =>
  [...new Set((Array.isArray(v) ? v : v ? [v] : []).map(Number))]
    .filter((x) => !isNaN(x));

export const assignmentApi = {
  /* GET */
  listByRoute: (id) =>
    axios.get(`/assignment/${id}/account`).then((r) => r.data),

  /* POST – gán account vào route */
  addMany: (id, list) =>
    axios.post(`/assignment/${id}`, { idAccountList: toArray(list) })
      .then((r) => r.data),

  /* DELETE – xoá account khỏi route */
  removeMany: (id, list) =>
    axios.delete(`/assignment/${id}`, { data: { idAccountList: toArray(list) } })
      .then((r) => r.data),
};
