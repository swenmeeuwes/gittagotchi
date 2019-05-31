const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

  // Configure body parser (to parse the body of requests)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false })); // 'extended' disallows the posting of nested objects. For more info on 'extended' see https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0

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