var Monster = require('../models/monsters');

// Display list of all Monsters.
exports.monsters_list = function (req, res) {
	Monster.find(function (err, monsters) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json(monsters);
		}
	});
};

// Display detail page for a specific Monster.
exports.monsters_detail = function (req, res) {
	Monster.findById(req.params._id, function (err, monster) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json(monster)
		}
	});
};

// Handle Monster create on POST.
exports.monster_create_post = function (req, res) {
	const monster = new Monster();
	monster.name = req.body.name;
	monster.creatureType = req.body.creatureType;
	monster.hitPoints = req.body.hitPoints;
	monster.armorClass = req.body.armorClass;
	monster.initModifier = req.body.initModifier;

	monster.save(function (err) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(monster);
		}
	})
};

// Display Monster delete form on DELETE.
exports.monster_delete_delete = function (req, res) {
	Monster.remove({ _id: req.params._id }, function (err, monster) {
		if (err) {
			res.send(err);
		} else {
			res.status(200).json({ message: 'Monster succesfully deleted' });
		}
	});
}

// Handle Monster update on PUT.
exports.monster_update_put = function (req, res) {
	Monster.findById(req.params._id, function (err, monster) {
		if (err) {
			res.send(err);
		} else {
			monster.name = req.body.name;
			monster.creatureType = req.body.creatureType;
			monster.hitPoints = req.body.hitPoints;
			monster.armorClass = req.body.armorClass;
			monster.initModifier = req.body.initModifier;

			monster.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.status(200).json(monster);
				}
			});
		}
	});
};
