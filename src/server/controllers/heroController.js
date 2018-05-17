var Hero = require('../models/heroes');

// Display list of all Heroes.
exports.heroes_list = function (req, res) {
	Hero.find(function (err, heroes) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.status(200).json(heroes);
		}
	});
}

// Display detail page for a specific Hero.
exports.heroes_detail = function (req, res) {
	Hero.findById(req.params._id, function (err, hero) {
		if (err) {
			res.send(err);
		} else {
			res.json(hero);
		}
	});
}

// Handle Hero create on POST.
exports.heroes_create_post = function (req, res) {
	const hero = new Hero();
	hero.name = req.body.name;
	hero.player = req.body.player;
	hero.hitPoints = req.body.hitPoints;
	hero.armorClass = req.body.armorClass;
	hero.initModifier = req.body.initModifier;

	hero.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Hero Created' });
		}
	});
}

// DELETE Hero.
exports.heroes_delete_delete = function (req, res) {
	Hero.remove({ _id: req.params._id }, function (err, hero) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'Hero succesfully deleted' });
		}
	});
}

// Handle Hero update on PUT.
exports.heroes_update_put = function (req, res) {
	Hero.findById(req.params._id, function (err, hero) {
		if (err) {
			res.send(err);
		} else {
			hero.name = req.body.name;
			hero.player = req.body.player;
			hero.hitPoints = req.body.hitPoints;
			hero.armorClass = req.body.armorClass;
			hero.initModifier = req.body.initModifier;

			hero.save(function (err) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'Hero succesfully updated' });
				}
			});
		}
	});
}

