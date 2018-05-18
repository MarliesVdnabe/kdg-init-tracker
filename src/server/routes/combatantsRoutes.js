var express = require('express');
var router = express.Router();

// Require controller modules.
var combatant_controller = require('../controllers/combatantController');

/// COMBATANT ROUTES ///

// GET all Combatants
router.get('/combatants', combatant_controller.combatants_list);

// POST request for creating a Combatant
router.post('/combatants/create', combatant_controller.combatants_create_post);

// GET one Combatant
router.get('/combatants/:_id', combatant_controller.combatants_detail);

// DELETE request to delete a Combatant.
router.delete('/combatants/:_id/delete', combatant_controller.combatants_delete_delete);

// POST request to update a Combatant.
router.post('/combatants/:_id/update', combatant_controller.combatants_update_put);

module.exports = router;