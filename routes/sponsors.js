var express = require('express');
var router = express.Router();

/* GET sponsors page. */
router.get('/', function(req, res, next) {
  res.render('pagina4', { title: 'alle sponsors' });
});

module.exports = router;
