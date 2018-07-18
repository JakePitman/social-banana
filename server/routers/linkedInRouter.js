const express = require('express');
const axios = require('axios');

const { authenticate } = require('./../middleware/authenticate');

const linkedInRouter = express.Router();

linkedInRouter.get('/hello', (req, res) => {
  res.send({ msg: 'hello from linkedInRouter' });
});

linkedInRouter.get('/authURL', authenticate, (req, res) => {
  try {
    const {
      LINKEDIN_CLIENT_ID,
      LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE
    } = process.env;

    const userId = req.user._id;
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;

    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${LINKEDIN_STATE}`;

    res.status(200).send({ url });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

linkedInRouter.get('/callback', async (req, res) => {
  try {
    // TODO: handle if error in query params
    // TODO: get userID back as query param
    console.log('HELLO FROM LINKEDIN CALLBACK!!');
    const { code, state, userId } = req.query;
    console.log(code);
    console.log(state);
    console.log(userId);

    const {
      LINKEDIN_CLIENT_ID,
      LINKEDIN_CLIENT_SECRET,
      LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE
    } = process.env;

    // TODO: may need to add userId query param again, but i think it ignores it when verifying
    // LINKEDIN_REDIRECT_URI += '%3FuserId%3D${userId}'
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;

    if (state !== LINKEDIN_STATE) {
      console.log(`Invalid state. State recieved: ${state}`);
      res.status(401).send('HACKZORS!!! >:(');
      return;
    }

    const response = await axios({
      method: 'POST',
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}`
    });

    const { access_token, expires_in } = response.data;
    console.log('access_token: ', access_token);
    console.log('expires_in: ', expires_in);

    // get access_token and expires_in from response, bcrypt and save to user
    const user = await User.findbyId(userId);
    // TODO: bcrypt access_token
    user.linkedIn.access_token = access_token;
    // user.linkedIn.expires_in = expires_in;

    // FIXME: what to send back? redirect to other page? close window?
    res.status(200).send('WOOOOO! GOT ACCESS TOKEN!! :O');
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { linkedInRouter };
