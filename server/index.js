const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// This is to test the proxy of the front end server for development
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.listen(port, () => console.log(`Listening on port ${port}`));
