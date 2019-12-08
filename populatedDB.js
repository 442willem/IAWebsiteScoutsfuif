#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.:mongodb+srv://semorshadow:AQWpm741963papeg@cluster0-mccno.azure.mongodb.net/scoutsfuif?retryWrites=true&w=majority');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Gebruiker = require('./models/Gebruiker')
var Ticket = require('./models/Ticket')
var Adres = require('./models/Adres')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology:true, connectTimeoutMS:360000});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var gebruikers = []
var adressen = []
var tickets = []

function gebruikerCreate(first_name, family_name, d_birth, email,ticketID,adresID, cb) {
  gebruikerdetail = {voornaam:first_name , achternaam: family_name, email:email }
  if (d_birth != false) gebruikerdetail.geboortedatum = d_birth
  if (ticketID != false) gebruikerdetail.tickets = ticketID
  if (adresID != false) gebruikerdetail.adres = adresID

  
  var gebruiker = new Gebruiker(gebruikerdetail);
       
  gebruiker.save(function (err) {
    if (err) {
      	cb(err, null)
      return
    }
    console.log('nieuwe gebruiker: ' + gebruiker);
    gebruikers.push(gebruiker)
    cb(null, gebruiker)
  }  );
}

function adresCreate(stad,postcode,straat,huisnummer, cb) {
  adresdetail = {stad: stad,postcode:postcode,straat:straat,huisnummer:huisnummer }
   
  var adres= new Adres(adresdetail);
  adres.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('Nieuw adres: ' + adres);
    adressen.push(adres)
    cb(null, adres);
  }   );
}

function ticketCreate(aantalVVK, aantalADK, cb) {
  ticketdetail = { aantalVVK:aantalVVK, aantalADK:aantalADK}
  var ticket = new Ticket(ticketdetail);    
  ticket.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('Nieuw ticket: ' + ticket);
    tickets.push(ticket)
    cb(null, ticket)
  }  );
}

function createTicket(cb){
	async.series([
			function(callback){
				ticketCreate('0','5',callback);
		},],cb);
}

function createAdres(cb){
	async.series([
			function(callback){
				adresCreate('Tielt','8700','ondankstraat','35',callback);
		},],cb);
}

function createGebruiker(cb){
	async.series([
			function(callback){
				gebruikerCreate('Sam','Dobbelaere','10/12/1999','samdobb@telenet.be', tickets[0], adressen[0],callback);
		},],cb);
}

async.series([
    createTicket,
    createAdres,
    createGebruiker
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('gebruikers: '+gebruikers);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



