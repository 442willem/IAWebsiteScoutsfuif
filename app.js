var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var algemeneInfoRouter = require('./routes/info');
var plaatsInfoRouter = require('./routes/info-plaats');
var sponsorRouter = require('./routes/sponsors');
var ticketRouter= require('./routes/tickets');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
// Set up mongoose connection
var dev_db_url = 'mongodb+srv://semorshadow:AQWpm741963papeg@cluster0-mccno.azure.mongodb.net/scoutsfuif?retryWrites=true&w=majority'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology:true },function(err){if(err){return console.error('failed');}});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/info',algemeneInfoRouter);
app.use('/index',indexRouter);
app.use('/info-plaats',plaatsInfoRouter);
app.use('/sponsors',sponsorRouter);
app.use('/tickets',ticketRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
