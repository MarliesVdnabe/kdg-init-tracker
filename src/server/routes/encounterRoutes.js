var express = require('express');
var router = express.Router();

// Require controller modules.
var encounter_controller = require('../controllers/encounterController');

/// ENCOUNTER ROUTER ///

// Get all Encounters
router.get('/encounters', encounter_controller.encounters_list);

// POST request for creating an encounter
router.post('/encounters/create', encounter_controller.encounters_create_post);

// GET one encounter
router.get('/encounters/:_id', encounter_controller.encounters_detail);

// DELETE request to delete an encounter
router.delete('/heroes/:_id/delete', encounter_controller.encounters_delete_delete);

// POST request to update an encounter
router.post('/encounters/:_id/update', encounter_controller.encounters_update_put);


module.exports = router;