const { User } = require('./../../models/User');

const validateCallback = async (req, res, next) => {
  const { error, error_description, code, state, userId } = req.query;

  try {
    if (error) {
      throw new Error(error_description);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('No user found');
    }

    const { LINKEDIN_REDIRECT_URI, LINKEDIN_STATE } = process.env;
    const redirect_uri = LINKEDIN_REDIRECT_URI + `%3FuserId%3D${userId}`;
    if (state !== LINKEDIN_STATE) {
      console.log('STATE CHANGED!');
      res.redirect('/settings');
      return;
    }

    req.user = user;
    req.code = code;
    req.redirect_uri = redirect_uri;
    next();
  } catch (error) {
    // FIXME: Cannot send error in body when redirect
    console.log(error.message);
    res.redirect('/settings');
  }
};

module.exports = { validateCallback };
