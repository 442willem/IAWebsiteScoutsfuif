//require Mongoose
var mongoose= require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var GebruikerSchema = new Schema({
  voornaam: {type: String, required: true},
  achternaam: {type: String, required: true},
  geboortedatum: {type: Date, required: true},
  email: {type: String, required: true},
  tickets: {type: Schema.Types.ObjectId, ref:'Ticket', required: true},
  adres:{type: Schema.Types.ObjectId, ref:'Adres' , required:true}
});

// Compile model from schema
module.exports = mongoose.model('Gebruiker', GebruikerSchema );