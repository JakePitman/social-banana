const express = require('express');
const axios = require('axios');

const { User } = require('./../models/User');
const jwt = require('jsonwebtoken');
// Middleware
const { authenticate } = require('./../middleware/authenticate');
const {
  validateCallback
} = require('./../middleware/linkedIn/validateCallback');
const { getAccessToken } = require('./../middleware/linkedIn/getAccessToken');
const {
  updateUserToggle
} = require('./../middleware/linkedIn/updateUserToggle');
const { validateListing } = require('./../middleware/linkedIn/validateListing');

// LinkedIn Routes - OAuth 2.0
const linkedInRouter = express.Router();

// GET authURL to send user to authorize our app
linkedInRouter.get('/authURL', authenticate, (req, res) => {
  const userId = req.user._id;

  try {
    const {
      LINKEDIN_CLIENT_ID,
      LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE
    } = process.env;

    // append the userId to callback url so to know identify the user in our database
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${LINKEDIN_STATE}`;

    res.status(200).send({ url });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: error.message });
  }
});

// LinkedIn sends request to our backend with access_code and state, validate the callback, exchange access_code for access_token with client id and secret
linkedInRouter.get(
  '/callback',
  validateCallback,
  getAccessToken,
  async (req, res) => {
    const { user, accessToken } = req;

    try {
      // save accessToken to user (hashed on save)
      user.linkedIn.accessToken = accessToken;
      await user.save();
      res.redirect('/settings?linkedIn_connected=true');
    } catch (error) {
      console.error(error.message);
      res.redirect(
        `/settings?linkedIn_connected=false&error_message=${error.message}`
      );
    }
  }
);

// Share to LinkedIn. Check user for accessToken, update user toggle status, validate listing
linkedInRouter.post(
  '/share',
  authenticate,
  updateUserToggle,
  validateListing,
  async (req, res) => {
    const { accessToken, shareBody } = req;

    try {
      // decode hashed access token
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );

      // share to linkedin
      const response = await axios({
        method: 'POST',
        url: 'https://api.linkedin.com/v1/people/~/shares?format=json',
        headers: {
          'Content-Type': 'application/json',
          'x-li-format': 'json',
          Authorization: `Bearer ${decodedAccessToken}`
        },
        data: shareBody
      });
      const { updateUrl } = response.data;

      res.status(201).send({ updateUrl });
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ error: error.message });
    }
  }
);

// Disconnect account from linkedIn
linkedInRouter.delete('/disconnect', authenticate, (req, res) => {
  const { user } = req;

  try {
    user.linkedIn.accessToken = null;
    user.save();
    res.status(200).send();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { linkedInRouter };
