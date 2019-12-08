var express = require('express');
var router = express.Router();

// Require controller modules.
var gebruiker_controller = require('../controllers/gebruikerController');

/* GET tickets page. */
router.get('/', gebruiker_controller.index);

router.post('/', gebruiker_controller.gebruiker_create_post);

module.exports = router;
