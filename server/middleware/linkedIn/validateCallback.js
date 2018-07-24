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
      console.error(`STATE CHANGED! Given state: ${state}`);
      res.redirect('/settings?linkedIn_connected=false&error_message=hackers');
      return;
    }

    req.user = user;
    req.code = code;
    req.redirect_uri = redirect_uri;
    next();
  } catch (error) {
    console.error(error.message);
    res.redirect(
      `/settings?linkedIn_connected=false&error_message=${error.message}`
    );
  }
};

module.exports = { validateCallback };
