const express = require('express');
const axios = require('axios');

const { User } = require('./../models/User');

// Middleware
const { authenticate } = require('./../middleware/authenticate');
const {
  validateCallback
} = require('./../middleware/linkedIn/validateCallback');
const { getAccessToken } = require('./../middleware/linkedIn/getAccessToken');

// LinkedIn Routes
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

      res.redirect('/settings');
    } catch (error) {
      // FIXME: Cannot send error in body when redirect
      console.log(error.message);
      res.redirect('/settings');
    }
  }
);

linkedInRouter.post('/share', authenticate, async (req, res) => {
  try {
    const { access_token } = req.user.linkedIn;
    if (!access_token) {
      throw new Error('Forbidden, linkedIn account not connected');
    }

    const { address, price, description } = req.body;
    const propertyType = req.body['property-type'];
    const landSize = req.body['land-size'];
    const inspectionDate = req.body['inspection-date'];
    const inspectionTime = req.body['inspection-time'];

    if (
      !address ||
      !price ||
      !description ||
      !propertyType ||
      !landSize ||
      !inspectionTime ||
      !inspectionDate
    ) {
      throw new Error('Denied. Not all listing fields given.');
    }

    const postBody = {
      comment: `${description}\n${propertyType} - ${landSize}m2 \nInspection: ${inspectionDate} : ${inspectionTime} \n#teambanana #property`,
      content: {
        title: `$${price} - \n${address}`,
        description: `This doesnt even show! (<= 256chars)`,
        'submitted-url': `https://www.realista.com.au/`,
        'submitted-image-url': `http://3.bp.blogspot.com/-6kABIu06PfM/UqX3w2XZZ6I/AAAAAAAAB8E/dBnFmfebuIc/s1600/Banana-Cottage.jpg`
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
