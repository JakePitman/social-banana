const express = require('express');
const axios = require('axios');

const { User } = require('./../models/User');
const { authenticate } = require('./../middleware/authenticate');

const linkedInRouter = express.Router();

linkedInRouter.get('/authURL', authenticate, (req, res) => {
  const userId = req.user._id;

  try {
    const {
      LINKEDIN_CLIENT_ID,
      LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE
    } = process.env;
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${LINKEDIN_STATE}`;
    res.status(200).send({ url });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

linkedInRouter.get('/callback', async (req, res) => {
  const { error, error_description, code, state, userId } = req.query;

  try {
    if (error) {
      throw new Error(error_description);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('No user found');
    }

    const {
      LINKEDIN_CLIENT_ID,
      LINKEDIN_CLIENT_SECRET,
      LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE
    } = process.env;
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;
    if (state !== LINKEDIN_STATE) {
      res.status(401).send({ error: 'HACKZORS!!! >:(' });
      return;
    }

    const response = await axios({
      method: 'POST',
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}`
    });
    // const response = await linkedin_bananas(
    //   code,
    //   redirect_uri,
    //   LINKEDIN_CLIENT_ID,
    //   LINKEDIN_CLIENT_SECRET
    // );

    const { access_token, expires_in } = response.data;
    // TODO: bcrypt access_token (PRE SAVE!! :O)
    // user.linkedIn.expires_in = expires_in;
    user.linkedIn.access_token = access_token;
    await user.save();
    // FIXME: what to send back? redirect to settings page? close window?
    res.status(200).send('WOOOOO! GOT ACCESS TOKEN!! :O');
  } catch (error) {
    // console.log(error.response.data); // for axios call, break into middleware
    // console.log(error.message);
    // console.log('hello! im in error');
    // console.log(error);
    res.status(400).send({ error: error.message });
  }
});

// const linkedin_bananas = async (
//   code,
//   redirect_uri,
//   LINKEDIN_CLIENT_ID,
//   LINKEDIN_CLIENT_SECRET
// ) => {
//   try {
//     const response = await axios({
//       method: 'POST',
//       url: 'https://www.linkedin.com/oauth/v2/accessToken',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}`
//     });
//     return response;
//   } catch (error) {
//     // console.log(error.response.data.error_description);
//     // res.status(400).send({ error: error.response.data.error_description });
//     return Promise.reject(error.response.data.error_description);
//   }
// };

module.exports = { linkedInRouter };
