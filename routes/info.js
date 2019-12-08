var express = require('express');
var router = express.Router();

/* GET Algemene Info page. */
router.get('/', function(req, res, next) {
  res.render('pagina1', { title: 'algemene info' });
});

module.exports = router;
