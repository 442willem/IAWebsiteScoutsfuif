var Gebruiker = require('../models/Gebruiker');
var Ticket = require('../models/Ticket');
var Adres = require('../models/Adres');
var mongoose= require('mongoose');
var async = require('async');
const validator = require('express-validator');

exports.index=function(req,res){
  async.parallel({
   gebruiker_count: function(callback){
     Gebruiker.countDocuments({},callback)}}
   ,function(err, results){res.render('tickets',{error:err,data:results});});
};

// Handle gebruiker create on POST.
exports.gebruiker_create_post = [
//check of de parameters niet leeg zijn
  validator.body('voornaam','Er is geen voornaam gegeven!').isLength({min:1}).trim(),
  validator.body('achternaam','Er is geen achternaam gegeven!').isLength({min:1}).trim(),
  validator.body('email','Gelieve een email in te vullen').isEmail(),
  validator.body('geboortedatum','Er is geen geboortedatum gegeven').isISO8601(),
  validator.body('VVK','Er zijn geen VVK ticketten gegeven').isLength({min:1}).trim(),
  validator.body('ADK','Er zijn geen ADK ticketten gegeven').isLength({min:1}).trim(),
  validator.body('stad','Stad is verplicht').isLength({min:1}).trim(),
  validator.body('postcode','Postcode is verplicht').isLength({min:4}).trim(),
  validator.body('straat','Straat is verplicht').isLength({min:1}).trim(),
  validator.body('huisnummer','Huisnummer is verplicht').isLength({min:1}).trim(),

//sanitize body
  validator.sanitizeBody('voornaam').escape(),
  validator.sanitizeBody('achternaam').escape(),
  validator.sanitizeBody('email').escape(),
  validator.sanitizeBody('geboortedatum').escape(),
  validator.sanitizeBody('VVK').escape(),
  validator.sanitizeBody('ADK').escape(),
  validator.sanitizeBody('stad').escape(),
  validator.sanitizeBody('postcode').escape(),
  validator.sanitizeBody('straat').escape(),
  validator.sanitizeBody('huisnummer').escape(),
  
  (req,res,next) =>{
   	 const errors = validator.validationResult(req);

	 const ticket=new Ticket({
		aantalVVK:req.body.VVK,
		aantalADK:req.body.ADK});

   	 const adress=new Adres({
		stad:req.body.stad,
		postcode:req.body.postcode,
		straat:req.body.straat,
		huisnummer:req.body.huisnummer});

	if (!errors.isEmpty()) {
     		 // There are errors. Render the form again with sanitized values/error messages.
      		res.render('tickets', 
			{ 	title: 'register tickets',
				voornaam:req.body.voornaam,
				VVK:req.body.VVK,
				ADK:req.body.ADK,
				stad:req.body.stad,
				postcode:req.body.postcode,
				straat:req.body.straat,
				huisnummer:req.body.huisnummer,
				achternaam:req.body.achternaam, 
				email:req.body.email, 
				geboortedatum:req.body.geboortedatum,
				errors: errors.array()});
    		  return;
   	 }
	else{
		
		ticket.save();
		adress.save();

		const gebruiker=new Gebruiker({
		voornaam:req.body.voornaam,
		achternaam:req.body.achternaam, 
		email:req.body.email, 
		geboortedatum:req.body.geboortedatum,
		tickets:ticket._id,
		adres:adress._id
		});

		gebruiker.save();
		res.render('completeRegistratie');
   	 }
}]

