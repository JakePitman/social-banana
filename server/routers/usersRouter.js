const express = require('express');
const usersRouter = express.Router();

const { User } = require('./../models/User');

usersRouter.get('/me', async (req, res) => {
  try {
    console.log('hello from /api/users/me');
    const user = await User.findOne({ email: 'MargaretBananaDev@gmail.com' });
    if (!user) {
      throw new Error();
    }
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

usersRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    if (!user) {
      throw new Error();
    }
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('authToken', token).send();
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = { usersRouter };
