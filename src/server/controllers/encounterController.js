var Encounter = require('../models/encounters');

// display list of all encounters.
exports.encounter_list = function (req, res) {
	Encounter.find(function (err, encounters) {
		if (err) {
			res.send(err);
		} else {
			res.json(encounters);
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
exports.heroes_create_post = function (req, res) {
	const encounter = new Encounter();
	encounter.name = req.body.name;
	encounter.heroes = req.body.heroes;
	encounter.monsters = req.body.monsters;

	encounter.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Encounter created' });
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
	Encounter.findById(req.params._id, function (err, hero) {
		if (err) {
			res.send(err);
		} else {
			encounter.name = req.body.name;
			encounter.heroes = req.body.heroes;
			encounter.monsters = req.body.monsters;

			encounter.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'Encounter succesfully updated' });
				}
			});
		}
	});
}