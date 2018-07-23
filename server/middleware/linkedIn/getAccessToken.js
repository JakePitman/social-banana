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
    req.expiresIn = response.data.expires_in;
    req.accessToken = response.data.access_token;
    next();
  } catch (error) {
    console.log(error.message);
    res.redirect(
      `/settings?linkedIn_connected=false&error_message=${error.message}`
    );
  }
};

module.exports = { getAccessToken };
