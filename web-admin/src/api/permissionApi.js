import client from './axiosClient';

export const getPermissionGroups = () => client.get('/permission-group');
