require('dotenv').config();
const express = require('express');
const path = require('path');

const { mongoose } = require('./db/mongoose');
const { usersRouter } = require('./routers/usersRouter');
const { linkedInRouter } = require('./routers/linkedInRouter');
const { twitterRouter } = require('./routers/twitterRouter');

const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/api/users', usersRouter);
app.use('/api/linkedin', linkedInRouter);
app.use('/api/twitter', twitterRouter);

// After building the front end to static files, get express to host it in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = { app };
