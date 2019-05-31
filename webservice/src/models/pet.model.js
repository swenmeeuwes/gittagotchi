const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const PetSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  food: { type: Number, required: true },
  happiness: { type: Number, required: true },
  growth: { type: Number, required: true }
});

PetSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pet', PetSchema);