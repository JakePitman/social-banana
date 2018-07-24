import axios from 'axios';

const createUser = async (email, password) => {
  const res = await axios.post('/api/users/register', { email, password });
  const { user } = res.data;
  const authToken = res.headers.authorization.split(' ')[1];
  return { user, authToken };
};

const loginUser = async (email, password) => {
  const res = await axios.post('/api/users/login', { email, password });
  const { user } = res.data;
  const authToken = res.headers.authorization.split(' ')[1];
  return { user, authToken };
};

const getUser = async (authToken) => {
  const res = await axios.get('/api/users/me', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { user } = res.data;
  return { user };
};

const updateUser = async (updates, authToken) => {
  try {
    const res = await axios.patch('/api/users/update', updates, {
      headers: { authorization: `Bearer ${authToken}` }
    });
    const { user } = res.data;
    return { user };
  } catch (error) {
    return Promise.reject(error.response.data.error.split(': ')[2]);
  }
};

const logoutUser = async (authToken) => {
  await axios.delete('/api/users/logout', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  return;
};

export default { createUser, loginUser, getUser, updateUser, logoutUser };
