//require Mongoose
var mongoose= require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var AdresSchema = new Schema({
  stad: {type: String, required: true},
  straat: {type: String, required: true},
  huisnummer: {type: Number,min:0, required: true},
  postcode: {type: Number,min:0, required: true},
});

// Compile model from schema
module.exports = mongoose.model('Adres', AdresSchema );