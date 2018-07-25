const express = require('express');
const OAuth = require('oauth');

const { User } = require('./../models/User');

// Middleware
const { authenticate } = require('./../middleware/authenticate');

// Twitter Routes - OAuth 1.0a
const twitterRouter = express.Router();

// Get twitter authURL to send user
twitterRouter.get('/authURL', authenticate, async (req, res) => {
  const { user } = req;
  const userId = user._id;

  try {
    // Contruct oauth, append userId to callback url
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      '1.0A',
      `${process.env.TWITTER_CALLBACK_URL}?userId=${userId}`,
      'HMAC-SHA1'
    );
    // Get oauth token and secret, construct url to send user
    await oauth.getOAuthRequestToken(function(
      error,
      oauth_token,
      oauth_token_secret,
      results
    ) {
      if (error) {
        console.error(error);
        res.send(error);
        return;
      }
      // Save tokenSecret to user
      user.twitter.temp.tokenSecret = oauth_token_secret;
      user.save();
      // Construct URL
      const authURL = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
      res.send({ url: authURL });
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: error.message });
  }
});

// Twitter sends request to our backend with token, verifier and userId. Get userId from query, check token against saved tokenSecret. Trade user verifier for access_token and access_token_secret, save to user.
twitterRouter.get('/callback', async (req, res) => {
  const { oauth_token, oauth_verifier, userId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('No user found');
    }
    const { tokenSecret } = user.twitter.temp;

    // Construct oauth
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      '1.0A',
      `${process.env.TWITTER_CALLBACK_URL}?userId=${userId}`,
      'HMAC-SHA1'
    );

    // Check token with usersTokenSecret, trade verifier for access token
    oauth.getOAuthAccessToken(
      oauth_token,
      tokenSecret,
      oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.error(error);
          res.redirect(
            `/settings?twitter_connected=false&error_message=${error.data}`
          );
          return;
        }
        // Save access_token and access_token_secret to user
        user.twitter.accessToken = oauth_access_token;
        user.twitter.accessTokenSecret = oauth_access_token_secret;
        user.save();
        res.redirect(`/settings?twitter_connected=true`);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.redirect(
      `/settings?twitter_connected=false&error_message=${error.message}`
    );
  }
});

// Share listing to twitter
twitterRouter.post('/share', authenticate, (req, res) => {
  const { user } = req;

  try {
    const { accessToken, accessTokenSecret } = user.twitter;
    if (!accessToken || !accessTokenSecret) {
      res.status(401).send({ error: 'User not authorized' });
      return;
    }
    const { address, price, description } = req.body;
    if (!address || !price || !description) {
      throw new Error('Denied. Not all required listing fields given.');
    }

    const tweetStatus = `$${price} - ${address} - ${description} #teambanana`;
    // Contruct oauth
    const oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      '1.0A',
      `${process.env.TWITTER_CALLBACK_URL}`,
      'HMAC-SHA1'
    );

    // Post to twitter
    oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      accessToken,
      accessTokenSecret,
      { status: tweetStatus },
      function(error, data) {
        if (error) {
          let message = 'Oops, something went wrong';
          if (error.statusCode === 403) {
            message = 'Duplicate Status';
          }
          res.status(400).send(message);
        } else {
          // construct status link
          const jsonData = JSON.parse(data);
          const { id_str } = jsonData;
          const { screen_name } = jsonData.user;
          const twitterUrl = `https://twitter.com/${screen_name}/status/${id_str}`;
          res.send({ twitterUrl });
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: error.message });
  }
});

// Disconnect account from twitter
twitterRouter.delete('/disconnect', authenticate, (req, res) => {
  const { user } = req;

  try {
    user.twitter.accessToken = null;
    user.save();
    res.status(200).send();
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { twitterRouter };
