require('dotenv').config();
const express = require('express');
const path = require('path');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/User');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// This is to test the proxy of the front end server for development
app.get('/api/hello', (req, res) => {
  console.log('hello from /api/hello');
  res.send({ express: 'Hello From Express' });
});

// TODO: User Routes
app.get('/api/users/me', async (req, res) => {
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

app.post('/api/users/register', async (req, res) => {
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

// After building the front end to static files, get express to host it in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
