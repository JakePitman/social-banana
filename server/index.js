require('dotenv').config();
const express = require('express');
const path = require('path');

const { mongoose } = require('./db/mongoose');
const { usersRouter } = require('./routers/usersRouter');
const { linkedInRouter } = require('./routers/linkedInRouter');

const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/api/users', usersRouter);
app.use('/api/linkedin', linkedInRouter);

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

module.exports = { app };
