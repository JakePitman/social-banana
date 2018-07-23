const express = require('express');
const axios = require('axios');
const OAuth = require('oauth');

const { User } = require('./../models/User');

// Middleware
const { authenticate } = require('./../middleware/authenticate');

// Twitter Routes
const twitterRouter = express.Router();

twitterRouter.get('/authURL', authenticate, async (req, res) => {
  console.log('hello from api/twitter/authURL');
  const { user } = req;
  const userId = user._id;

  try {
    // TODO: middleware - Contruct twitter OAuth object
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      '1.0A',
      `${process.env.TWITTER_CALLBACK_URL}?userId=${userId}`,
      'HMAC-SHA1'
    );

    await oauth.getOAuthRequestToken(function(
      error,
      oauth_token,
      oauth_token_secret,
      results
    ) {
      console.log('error: ', error);
      console.log('oauth_token:', oauth_token);
      console.log('oauth_token_secret:', oauth_token_secret);
      console.log('results', results);

      // Save to user
      // user.twitter.temp.oauth_token = oauth_token; // dont need to save this
      user.twitter.temp.oauth_token_secret = oauth_token_secret;
      user.save();

      // Construct URL
      const authURL = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
      res.send({ url: authURL });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

twitterRouter.get('/callback', async (req, res) => {
  console.log('hello from /api/twitter/callback');
  // TODO: middlware - verify callback
  const { oauth_token, oauth_verifier, userId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('No user found');
    }
    const { oauth_token_secret } = user.twitter.temp;

    // TODO: middleware - construct oauth AGAIN
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      '1.0A',
      `${process.env.TWITTER_CALLBACK_URL}?userId=${userId}`,
      'HMAC-SHA1'
    );

    // Get access token
    oauth.getOAuthAccessToken(
      oauth_token,
      oauth_token_secret,
      oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        console.log('error: ', error);
        console.log('oauth_access_token: ', oauth_access_token);
        console.log('oauth_access_token_secret: ', oauth_access_token_secret);
        console.log('results: ', results);

        // Save to user
        user.twitter.oauth_access_token = oauth_access_token;
        user.twitter.oauth_access_token_secret = oauth_access_token_secret;
        user.save();
      }
    );
    res.redirect(`/settings?twitter_connected=true`);
  } catch (error) {
    console.log(error);
    res.redirect(
      `/settings?twitter_connected=false&error_message=${error.message}`
    );
  }
});

twitterRouter.post('/share', (req, res) => {
  try {
    console.log('hello from api/twitter/callback');
    res.send();
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { twitterRouter };
