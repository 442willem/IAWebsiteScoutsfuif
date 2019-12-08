var express = require('express');
var router = express.Router();

// Require controller modules.
var adres_controller = require('../controllers/adresController');

/// adres ROUTES ///

// GET request for creating a adres. NOTE This must come before routes that display Book (uses id).
router.get('/adres/create', adres_controller.adres_create_get);

// POST request for creating adres.
router.post('/adres/create', adres_controller.adres_create_post);

// GET request to delete adres.
router.get('/adres/:id/delete', adres_controller.adres_delete_get);

// POST request to delete adres.
router.post('/adres/:id/delete', adres_controller.adres_delete_post);

// GET request to update adres.
router.get('/adres/:id/update', adres_controller.adres_update_get);

// POST request to update adres.
router.post('/adres/:id/update', adres_controller.adres_update_post);

// GET request for one adres.
router.get('/adres/:id', adres_controller.adres_detail);

// GET request for list of all adres items.
router.get('/adres', adres_controller.adres_list);

module.exports = router;