import axios from 'axios';

const loginUser = async (email, password) => {
  const res = await axios.post('/api/users/login', { email, password });
  const { user } = res.data;
  const authToken = res.headers.authorization.split(' ')[1];
  return { user, authToken };
};

const createUser = async (email, password) => {
  const res = await axios.post('/api/users/register', { email, password });
  const authToken = res.headers.authorization.split(' ')[1];
  return { user, authToken };
};

const logoutUser = async (authToken) => {
  await axios.delete('/api/users/logout', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  return;
};

const getUser = async (authToken) => {
  const res = await axios.get('/api/users/me', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { user } = res.data;
  return { user };
};

export default { loginUser, createUser, logoutUser, getUser };
