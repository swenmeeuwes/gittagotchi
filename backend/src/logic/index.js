const hooks = require('./hooks');
const jobs = require('./jobs');

exports.init = () => {
  hooks.init();
  jobs.init();
};