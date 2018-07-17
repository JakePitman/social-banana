const { User } = require('./../models/User');

const authenticate = async (req, res, next) => {
  const { authToken } = req.cookies;

  try {
    const user = await User.findByToken(authToken);
    req.user = user;
    req.token = authToken;
    console.log(`user authenticated: ${user.email}`);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = { authenticate };
