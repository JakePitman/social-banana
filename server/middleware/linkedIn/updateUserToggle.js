const updateUserToggle = async (req, res, next) => {
  const { user } = req;
  const { accessToken } = user.linkedIn;

  try {
    if (!accessToken) {
      res
        .status(401)
        .send({ error: 'Forbidden, linkedIn account not connected' });
      return;
    }
    // update User
    user.linkedIn.toggleStatus = true;
    await user.save();
    req.accessToken = accessToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { updateUserToggle };
