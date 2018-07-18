const express = require('express');
const axios = require('axios');

const { User } = require('./../models/User');

// Middleware
const { authenticate } = require('./../middleware/authenticate');
const { validateCallback } = require('./../middleware/linkedIn/validateCallback');
const { getAccessToken } = require('./../middleware/linkedIn/getAccessToken');

// LinkedIn Routes
const linkedInRouter = express.Router();

linkedInRouter.get('/authURL', authenticate, (req, res) => {
  const userId = req.user._id;
  try {
    const { LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI, LINKEDIN_STATE } = process.env;
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${redirect_uri}&state=${LINKEDIN_STATE}`;
    res.status(200).send({ url });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

linkedInRouter.get('/callback', validateCallback, getAccessToken, async (req, res) => {
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
});

linkedInRouter.post('/share', authenticate, async (req, res) => {
  try {
    const { access_token } = req.user.linkedIn;
    if (!access_token) {
      throw new Error('Forbidden, linkedIn account not connected');
    }

    // FIXME: construct postBody from req.body, hardcoded atm
    // const { address, price, type, bedrooms, bathrooms, garages } = req.body;

    const postBody = {
      comment:
        'MARGARETS GOT A BARGAIN! 3 Bedrooms, 2 Bathrooms, 2 garages #bargain (<= 700chars)',
      content: {
        title: '$750,000! 123 Fake St, Cranbourne, Melbourne (<= 200chars)',
        description: 'This doesnt even show! (<= 256chars)',
        'submitted-url': 'https://bananadev.com.au/property/listingId',
        'submitted-image-url': 'https://bananadev.com/property/listingId/image.png'
      },
      visibility: {
        code: 'anyone'
      }
    };

    const response = await axios({
      method: 'POST',
      url: 'https://api.linkedin.com/v1/people/~/shares?format=json',
      headers: {
        'Content-Type': 'application/json',
        'x-li-format': 'json',
        Authorization: `Bearer ${access_token}`
      },
      data: postBody
    });
    const { updateUrl } = response.data;
    res.status(201).send({ updateUrl });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { linkedInRouter };
