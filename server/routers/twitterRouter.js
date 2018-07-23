const express = require('express');
const OAuth = require('oauth');

const { User } = require('./../models/User');

// Middleware
const { authenticate } = require('./../middleware/authenticate');

// Twitter Routes
const twitterRouter = express.Router();

// TODO: change to async await
twitterRouter.get('/authURL', authenticate, async (req, res) => {
  console.log('hello from api/twitter/authURL');
  const { user } = req;
  const userId = user._id;

  try {
    // Contruct oauth
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
        console.log(error);
        res.send(error);
        return;
      }
      // Save to user
      user.twitter.temp.tokenSecret = oauth_token_secret;
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

// TODO: change to async await
twitterRouter.get('/callback', async (req, res) => {
  console.log('hello from /api/twitter/callback');
  // TODO: middlware - verify callback
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
          console.log(error);
          res.redirect(
            `/settings?twitter_connected=false&error_message=${error.data}`
          );
          return;
        }
        // Save to user
        user.twitter.accessToken = oauth_access_token;
        user.twitter.accessTokenSecret = oauth_access_token_secret;
        user.save();
        res.redirect(`/settings?twitter_connected=true`);
      }
    );
  } catch (error) {
    console.log(error);
    res.redirect(
      `/settings?twitter_connected=false&error_message=${error.message}`
    );
  }
});

// TODO: split into middleware
// TODO: change to async await
twitterRouter.post('/share', authenticate, (req, res) => {
  console.log('hello from api/twitter/share');
  const { user } = req;
  const { accessToken, accessTokenSecret } = user.twitter;

  console.log(req.body);
  const { address, price, description } = req.body;
  const propertyType = req.body['property-type'];
  const landSize = req.body['land-size'];
  const inspectionDate = req.body['inspection-date'];
  const inspectionTime = req.body['inspection-time'];
  const tweetStatus = `$${price} - ${address} - ${description} #teambanana`;

  try {
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
          // construct Status link
          const jsonData = JSON.parse(data);
          console.log(jsonData);
          const { id_str } = jsonData;
          const { screen_name } = jsonData.user;
          const twitterUrl = `https://twitter.com/${screen_name}/status/${id_str}`;
          res.send({ twitterUrl });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { twitterRouter };
