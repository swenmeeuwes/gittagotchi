const express = require('express');
const router = express.Router();

// Controller routes
router.use('/pet', require('./pet.route'));

module.exports = router;