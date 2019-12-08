var express = require('express');
var router = express.Router();

// Require controller modules.
var gebruiker_controller = require('../controllers/gebruikerController');

/// adres ROUTES ///

// GET request for creating a gebruiker. NOTE This must come before routes that display Book (uses id).
router.get('/gebruiker/create', gebruiker_controller.gebruiker_create_get);

// POST request for creating gebruiker.
router.post('/gebruiker/create', gebruiker_controller.gebruiker_create_post);

// GET request to delete gebruiker.
router.get('/gebruiker/:id/delete', gebruiker_controller.gebruiker_delete_get);

// POST request to delete gebruiker.
router.post('/gebruiker/:id/delete', gebruiker_controller.gebruiker_delete_post);

// GET request to update gebruiker.
router.get('/gebruiker/:id/update', gebruiker_controller.gebruiker_update_get);

// POST request to update gebruiker.
router.post('/gebruiker/:id/update', gebruiker_controller.gebruiker_update_post);

// GET request for one gebruiker.
router.get('/gebruiker/:id', gebruiker_controller.gebruiker_detail);

// GET request for list of all gebruiker items.
router.get('/gebruiker', gebruiker_controller.gebruiker_list);

module.exports = router;