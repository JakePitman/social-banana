const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// This is to test the proxy of the front end server for development
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// TODO: User Routes
// TODO: setup mongoose

// After building the front end to static files, get express to host it in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
