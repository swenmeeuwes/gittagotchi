const express = require('express');

const app = express();
const port = process.env.PORT || 433;

// Configure routes
const routes = require('./routes');
app.use('/api', routes);

// Default API response
app.get('/', (req, res) => {
  res.sendStatus(200); // OK
});

app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});