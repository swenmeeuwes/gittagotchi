const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const port = process.env.PORT || config.app.port || 433;

// Set up database connection
const mongoDbConfig = { useNewUrlParser: true };
const mongoDb = process.env.MONGODB_URI || config.database.connectionString;
mongoose.connect(mongoDb, mongoDbConfig);

const databaseConnection = mongoose.connection;
databaseConnection.on('error', console.error.bind(console, 'Database connection error:'));
databaseConnection.once('open', () => {
  console.log('Successfully connected to database!');

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
});