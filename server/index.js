require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const { mongoose } = require('./db/mongoose');
const { usersRouter } = require('./routers/usersRouter');

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());

// users routes
app.use('/api/users', usersRouter);

// This is to test the proxy of the front end server for development
app.get('/api/hello', (req, res) => {
  console.log('hello from /api/hello');
  res.send({ express: 'Hello From Express' });
});

// After building the front end to static files, get express to host it in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
