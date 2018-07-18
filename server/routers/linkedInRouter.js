const express = require('express');
const axios = require('axios');

const { User } = require('./../models/User');
const { authenticate } = require('./../middleware/authenticate');
const {
  validateCallback
} = require('./../middleware/linkedIn/validateCallback');
const { getAccessToken } = require('./../middleware/linkedIn/getAccessToken');

const linkedInRouter = express.Router();

// LinkedIn Routes
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
    res.status(400).send({ error: error.message });
  }
});

linkedInRouter.get(
  '/callback',
  validateCallback,
  getAccessToken,
  async (req, res) => {
    const { user, access_token } = req;

    try {
      // TODO: bcrypt access_token (PRE SAVE!! :O)
      user.linkedIn.access_token = access_token;
      await user.save();
      // FIXME: what to send back? redirect to settings page? close window?
      res.status(200).send('WOOOOO! GOT ACCESS TOKEN!! :O');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

module.exports = { linkedInRouter };
