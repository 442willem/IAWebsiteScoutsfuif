var express = require('express');
var router = express.Router();

/* GET Info Plaats page. */
router.get('/', function(req, res, next) {
  res.render('info-plaats', { title: 'info over plaats' });
});

module.exports = router;
