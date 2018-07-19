import axios from 'axios';

const getAuthURL = async (authToken) => {
  const res = await axios.get('/api/linkedIn/authURL', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { url } = res.data;
  return { url };
};

const shareListing = async (listing) => {
  const res = await axios.post(
    '/api/linkedIn/share',
    { listing },
    {
      headers: { authorization: `Bearer ${authToken}` }
    }
  );
  const { updateUrl } = res.data;
  return { updateUrl };
};

export default { getAuthURL, shareListing };
