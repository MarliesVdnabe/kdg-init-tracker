var express = require('express');
var router = express.Router();

// Require controller modules.
var combatant_controller = require('../controllers/combatantController');

/// COMBATANT ROUTES ///

// GET all Combatants
router.get('/combatants', combatant_controller.combatants_list);

// POST request for creating a Combatant
router.post('/combatant/create', combatant_controller.combatants_create_post);

// GET one Combatant
router.get('/combatant/:_id', combatant_controller.combatants_detail);

// DELETE request to delete a Combatant.
router.delete('/combatant/:_id/delete', combatant_controller.combatants_delete_delete);

// POST request to update a Combatant.
router.post('/combatant/:_id/update', combatant_controller.combatants_update_put);

module.exports = router;