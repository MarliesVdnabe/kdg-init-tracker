var express = require('express');
var router = express.Router();

// Require controller modules.
var hero_controller = require('../controllers/heroController');

/// HERO ROUTES ///

// GET all Heroes
router.get('/heroes', hero_controller.heroes_list);

// POST request for creating a Hero
router.post('/heroes/create', hero_controller.heroes_create_post);

// GET one Hero
router.get('/heroes/:_id', hero_controller.heroes_detail);

// DELETE request to delete a Hero.
router.delete('/heroes/:_id/delete', hero_controller.heroes_delete_delete);

// POST request to update a Hero.
router.post('/heroes/:_id/update', hero_controller.heroes_update_put);

module.exports = router;