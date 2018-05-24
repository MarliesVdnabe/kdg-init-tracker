#! /usr/bin/env node
console.log('This script populates the data base with some dummy data');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const args = userArgs[0].trim();
// if (!args.startsWith('mongodb')) {
// 	console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
// 	return
// }

const async = require('async');
const Hero = require('./models/heroes');
const Monster = require('./models/monsters');
const Encounter = require('./models/encounters').Encounter;

const mongoose = require('mongoose');
const mongoDB = 'mongodb://initTrackerAdmin:Passw0rd@ds119070.mlab.com:19070/init_tracker';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const heroes = []
const monsters = []
const encounters = []

function heroCreate(name, player, creatureType, hitPoints, armorClass, initModifier, callback) {
	let hero_detail = {
		name: name,
		creatureType: creatureType,
		hitPoints: hitPoints,
		armorClass: armorClass,
		initModifier: initModifier
	};

	if (player != false) {
		hero_detail.player = player;
	} else {
		hero_detail.player = null;
	}
	const hero = new Hero(hero_detail);
	hero.save(function (err) {
		if (err) {
			callback(err, null)
			return
		}
		console.log('New Hero: ' + hero);
		heroes.push(hero)
		callback(null, hero)
	});
}

function monsterCreate(name, creatureType, hitPoints, armorClass, initModifier, callback) {
	let monster_detail = {
		name: name,
		creatureType: creatureType,
		hitPoints: hitPoints,
		armorClass: armorClass,
		initModifier: initModifier
	};

	const monster = new Monster(monster_detail);
	monster.save(function (err) {
		if (err) {
			callback(err, null)
			return
		}
		console.log('New Monster: ' + monster);
		monsters.push(monster)
		callback(null, monster)
	});
}

function encounterCreate(name, heroes, monsters, callback) {
	let encounter_detail = {
		name: name,
		heroes: heroes,
		monsters: monsters
	};
	console.log(encounter_detail);

	const encounter = new Encounter(encounter_detail);
	console.log(encounter);
	encounter.save(function (err) {
		if (err) {
			callback(err, null)
			return
		}
		console.log('New encounter: ' + encounter);
		encounters.push(encounter)
		callback(null, encounter)
	});
}

function createMonsters(cb) {
	async.parallel([
		function (callback) {
			monsterCreate('Red Dragon', 0, 75, 17, -1, callback);
		},
		function (callback) {
			monsterCreate('Spider', 0, 1, 12, 2, callback);
		},
		function (callback) {
			monsterCreate('Swarm of Poisonous Snakes', 0, 36, 14, 5, callback);
		},
		function (callback) {
			monsterCreate('Vampire', 0, 23, 15, 4, callback);
		},
		function (callback) {
			monsterCreate('Werewolf', 0, 43, 21, 5, callback);
		},
		function (callback) {
			monsterCreate("Awakened Tree", 0, 58, 11, 0, callback);
		},
		function (callback) {
			monsterCreate("Black Pudding", 0, 168, 17, -3, callback);
		},
		function (callback) {
			monsterCreate("Flesh Golem", 0, 93, 9, -1, callback);
		},
	],
		// optional callback
		cb);
}

function createHeroes(callback) {
	async.parallel([
		function (callback) {
			heroCreate('Hill Dwarf', false, 1, 11, 18, -1, callback);
		},
		function (callback) {
			heroCreate('Underfoot', 'Jeroen', 1, 9, 14, 3, callback);
		},
		function (callback) {
			heroCreate('Halfling', false, 1, 10, 16, 3, callback);
		},
		function (callback) {
			heroCreate('Elf Wizard', false, 1, 12, 22, 4, callback);
		},
		function (callback) {
			heroCreate('Human Fighter', false, 1, 8, 17, 2, callback);
		},
	],
		// optional callback
		callback);
}

function createEncouters(callback) {
	async.parallel([
		function (callback) {
			encounterCreate('The Kingkiller Chronicle', [
				{ originalHero: heroes[0], currentHitPoints: 9, currentArmorClass: 18, played: false, initiative: 5 },
				{ originalHero: heroes[1], currentHitPoints: 9, currentArmorClass: 14, played: false, initiative: 6 }
			], [
					{ originalMonster: monsters[3], currentHitPoints: 23, currentArmorClass: 15, played: true, initiative: 8, visible: true }
				], callback);
		}
	],
		// optional callback
		callback);
}

async.series([
	createMonsters,
	createHeroes,
	createEncouters
],
	// Optional callback
	function (err, results) {
		if (err) {
			console.log('FINAL ERR: ' + err);
		}
		else {
			console.log('ENCOUNTERS: ' + encounters);
		}
		// All done, disconnect from database
		mongoose.connection.close();
	});
