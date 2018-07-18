const axios = require('axios');

const getAccessToken = async (req, res, next) => {
  const { code, redirect_uri } = req;
  const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET } = process.env;

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}`
    });

    console.log(response.data.access_token);
    req.expires_in = response.data.expires_in;
    req.access_token = response.data.access_token;
    next();
  } catch (error) {
    res.status(400).send({ error: error.response.data });
  }
};

module.exports = { getAccessToken };
