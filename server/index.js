const express = require('express');

const app = express();
const port = 3001;

// This is to test the proxy of the front end server for development
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
