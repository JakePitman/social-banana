import axios from 'axios';

const getLinkedInURL = async (authToken) => {
  const res = await axios.get('/api/linkedIn/authURL', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { url } = res.data;
  return { url };
};

const shareListing = async (listing, authToken) => {
  const res = await axios.post('/api/linkedIn/share', listing, {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { updateUrl } = res.data;
  return { updateUrl };
};

export default { getLinkedInURL, shareListing };
