var Encounter = require('../models/encounters');

// display list of all encounters.
exports.encounters_list = function (req, res) {
	Encounter.find(function (err, encounters) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json(encounters);
		}
	});
}

// detail page for a specific encounter
exports.encounters_detail = function (req, res) {
	Encounter.findById(req.params._id, function (err, encounter) {
		if (err) {
			res.send(err);
		} else {
			res.json(encounter);
		}
	});
}

// Handle Encounter create on Post
exports.encounters_create_post = function (req, res) {
	const encounter = new Encounter();
	encounter.name = req.body.name;
	encounter.combatants = req.body.combatants;

	encounter.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json(encounter);
		}
	});
}

// DELETE encounter
exports.encounters_delete_delete = function (req, res) {
	Encounter.remove({ _id: req.params._id }, function (err, encounter) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Encounter succesfully deleted' });
		}
	});
}

// Handle Encounter update on PUT
exports.encounters_update_put = function (req, res) {
	Encounter.findById(req.params._id, function (err, encounter) {
		if (err) {
			res.send(err);
		} else {
			encounter.name = req.body.name;
			encounter.combatants = req.body.combatants;

			encounter.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json(encounter);
				}
			});
		}
	});
}