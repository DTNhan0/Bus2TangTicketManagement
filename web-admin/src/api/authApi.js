export const fakeLogin = ({ username, password }) =>
  new Promise((res, rej) =>
    username === 'admin' && password === '12345'
      ? res({ username, role: 'ADMIN' })
      : rej(new Error('Sai thông tin đăng nhập')),
  );
