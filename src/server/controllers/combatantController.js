var Combatant = require('../models/combatant');

// Display list of all Combatants.
exports.combatants_list = function (req, res) {
	Combatant.find(function (err, combatants) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(combatants);
		}
	});
}

// Display detail page for a specific Combatant.
exports.combatants_detail = function (req, res) {
	Combatant.findById(req.params._id, function (err, combatant) {
		if (err) {
			res.send(err);
		} else {
			res.json(combatant);
		}
	});
}

// Handle Combatant create on POST.
exports.combatants_create_post = function (req, res) {
	const combatant = new Combatant();
	combatant.oid = req.body.oid;
	// combatant.name = req.body.name;
	// combatant.player = req.body.player;
	combatant.type = req.body.type;
	// combatant.hitPoints = req.body.hitPoints;
	combatant.currentHitPoints = req.body.currentHitPoints;
	// combatant.armorClass = req.body.armorClass;
	// combatant.initModifier = req.body.initModifier;
	combatant.initiative = req.body.initiative;
	combatant.played = req.body.played;

	combatant.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Combatant Created' });
		}
	});
}

// DELETE Combatant.
exports.combatants_delete_delete = function (req, res) {
	Combatant.remove({ _id: req.params._id }, function (err, combatant) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Combatantsuccesfully deleted' });
		}
	});
}

// Handle Combatant update on PUT.
exports.combatants_update_put = function (req, res) {
	Combatant.findById(req.params._id, function (err, combatant) {
		if (err) {
			res.send(err);
		} else {
			combatant.oid = req.body.oid;
			// combatant.name = req.body.name;
			// combatant.player = req.body.player;
			combatant.type = req.body.type;
			// combatant.hitPoints = req.body.hitPoints;
			combatant.currentHitPoints = req.body.currentHitPoints;
			// combatant.armorClass = req.body.armorClass;
			// combatant.initModifier = req.body.initModifier;
			combatant.initiative = req.body.initiative;
			combatant.played = req.body.played;

			combatant.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'Combatant succesfully updated' });
				}
			});
		}
	});
}

