import axios from 'axios';

const getLinkedInURL = async (authToken) => {
  const res = await axios.get('/api/linkedin/authURL', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { url } = res.data;
  return { url };
};

const shareListing = async (listing, authToken, toggleSettings) => {
  let linkedInUrl = '';
  if (toggleSettings.linkedIn) {
    const res = await axios.post('/api/linkedin/share', listing, {
      headers: { authorization: `Bearer ${authToken}` }
    });
    linkedInUrl = res.data.updateUrl;
  }
  if (toggleSettings.twitter) {
    console.log('post made to Twitter');
  }
  return { linkedInUrl };
};

export default { getLinkedInURL, shareListing };
