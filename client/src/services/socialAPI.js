import axios from 'axios';

const getLinkedInURL = async (authToken) => {
  const res = await axios.get('/api/linkedin/authURL', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { url } = res.data;
  return { url };
};

const getTwitterURL = async (authToken) => {
  const res = await axios.get('/api/twitter/authURL', {
    headers: { authorization: `Bearer ${authToken}` }
  });
  const { url } = res.data;
  return { url };
};

const disconnectLinkedIn = async (authToken) => {
  await axios.delete('/api/linkedin/disconnect', {
    headers: { authorization: `Bearer ${authToken}` }
  });
};

const disconnectTwitter = async (authToken) => {
  await axios.delete('/api/twitter/disconnect', {
    headers: { authorization: `Bearer ${authToken}` }
  });
};

const shareListing = async (listing, authToken, toggleSettings) => {
  let linkedInUrl = '';
  let twitterUrl = '';
  if (toggleSettings.linkedIn) {
    const res = await axios.post('/api/linkedin/share', listing, {
      headers: { authorization: `Bearer ${authToken}` }
    });
    linkedInUrl = res.data.updateUrl;
  }
  if (toggleSettings.twitter) {
    console.log('post made to Twitter');
    const res = await axios.post('/api/twitter/share', listing, {
      headers: { authorization: `Bearer ${authToken}` }
    });
    twitterUrl = res.data.twitterUrl;
  }
  return { linkedInUrl, twitterUrl };
};

export default {
  getLinkedInURL,
  getTwitterURL,
  disconnectTwitter,
  disconnectLinkedIn,
  shareListing
};
