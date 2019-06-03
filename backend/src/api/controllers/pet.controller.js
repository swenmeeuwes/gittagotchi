const Pet = require('../models/pet.model');

exports.create = (req, res, next) => {
  const pet = new Pet({
    uid: req.body.uid,
    description: req.body.description,
    food: 0,
    happiness: 0,
    growth: 0
  });

  pet.save((error) => {
    if (error) {
      res.sendStatus(400); // BAD REQUEST
      return next(error);
    }

    res.sendStatus(201); // CREATED
  });
};