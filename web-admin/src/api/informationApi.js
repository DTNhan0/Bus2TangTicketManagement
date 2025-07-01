import client from './axiosClient';

const PREFIX = '/information';

export const getAllInformation = () => client.get(PREFIX);
export const createInformation = (body) => client.post(PREFIX, body);
export const updateInformation = (id, body) => client.put(`${PREFIX}/${id}`, body);
export const deleteInformation = (id) => client.delete(`${PREFIX}/${id}`);
