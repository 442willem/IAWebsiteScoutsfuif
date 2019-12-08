//require Mongoose
var mongoose= require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
  aantalVVK: {type: Number,min: 0, required: true},
  aantalADK: {type: Number,min:0, required: true}
});

// Compile model from schema
module.exports = mongoose.model('Ticket', TicketSchema );