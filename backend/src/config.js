const environment = process.env.NODE_ENV || 'development';
const config = {
  development: {
    app: {
      port: 433
    },
    database: {
      connectionString: ''
    }
  }
};

module.exports = config[environment];