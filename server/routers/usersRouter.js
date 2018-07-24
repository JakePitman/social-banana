const express = require('express');

const { authenticate } = require('./../middleware/authenticate');
const { User } = require('./../models/User');

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res) => {
  const { email, password, name, company, phone } = req.body;

  try {
    const user = await User.create({ email, password, name, company, phone });
    const token = await user.generateAuthToken();
    res.header('authorization', `Bearer ${token}`).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header('authorization', `Bearer ${token}`).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRouter.get('/me', authenticate, async (req, res) => {
  const { user } = req;

  try {
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

usersRouter.patch('/update', authenticate, async (req, res) => {
  const { user } = req;
  const { name, company, phone } = req.body;

  try {
    await user.set({ name, company, phone });
    const updatedUser = await user.save();
    res.status(200).send({ updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

usersRouter.delete('/logout', authenticate, async (req, res) => {
  const { user, token } = req;

  try {
    await user.removeToken(token);
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { usersRouter };
