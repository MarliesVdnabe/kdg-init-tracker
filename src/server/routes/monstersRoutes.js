var express = require('express');
var router = express.Router();

// Require controller modules.
var monster_controller = require('../controllers/monsterController');

/// monster ROUTES ///

// Get all monsters
router.get('/monsters', monster_controller.monsters_list);

// POST request for creating a monster
router.post('/monster/create', monster_controller.monster_create_post);

// Get one monster
router.get('/monster/:_id', monster_controller.monsters_detail);

// DELETE request to delete a monster.
router.delete('/monster/:_id/delete', monster_controller.monster_delete_delete);

// POST request to update a monster.
router.post('/monster/:_id/update', monster_controller.monster_update_put);

module.exports = router;