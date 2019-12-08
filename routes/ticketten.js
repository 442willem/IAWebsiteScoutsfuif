var express = require('express');
var router = express.Router();

// Require controller modules.
var ticket_controller = require('../controllers/ticketController');

/// ticket ROUTES ///

// GET request for creating a adres. NOTE This must come before routes that display Book (uses id).
router.get('/ticket/create', ticket_controller.adres_ticket_get);

// POST request for creating ticket.
router.post('/ticket/create', ticket_controller.ticket_create_post);

// GET request to delete ticket.
router.get('/ticket/:id/delete', ticket_controller.ticket_delete_get);

// POST request to delete ticket.
router.post('/ticket/:id/delete', ticket_controller.ticket_delete_post);

// GET request to update ticket.
router.get('/ticket/:id/update', ticket_controller.ticket_update_get);

// POST request to update ticket.
router.post('/ticket/:id/update', ticket_controller.ticket_update_post);

// GET request for one ticket.
router.get('/ticket/:id', ticket_controller.ticket_detail);

// GET request for list of all ticket items.
router.get('/ticket', ticket_controller.ticket_list);

module.exports = router;