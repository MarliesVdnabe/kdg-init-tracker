#! /usr/bin/env node
console.log('This script populates the data base with some dummy data');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
const args = userArgs[0].trim();
// if (!args.startsWith('mongodb')) {
// 	console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
// 	return
// }

var async = require('async');
var Hero = require('./models/heroes');
var Monster = require('./models/monsters');
var Combatant = require('./models/combatant');
var Encounter = require('./models/encounters');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://initTrackerAdmin:Passw0rd@ds119070.mlab.com:19070/init_tracker';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var heroes = []
var monsters = []
var encounters = []
var combatants = []

function heroCreate(name, player, type, hitPoints, armorClass, initModifier, callback) {
	hero_detail = { name: name, type: type, hitPoints: hitPoints, armorClass: armorClass, initModifier: initModifier }
	if (player != false) {
		hero_detail.player = player;
	} else {
		hero_detail.player = null;
	}
	var hero = new Hero(hero_detail);
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

function monsterCreate(name, type, hitPoints, armorClass, initModifier, callback) {
	monster_detail = { name: name, type: type, hitPoints: hitPoints, armorClass: armorClass, initModifier: initModifier }
	var monster = new Monster(monster_detail);
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

function combatantCreate(combatant, type, currentHitPoints, initiative, played, callback) {
	combatant_detail = { combatant: combatant, type: type, currentHitPoints: currentHitPoints, initiative: initiative, played: played }
	var combatant = new Combatant(combatant_detail);
	combatant.save(function (err) {
		if (err) {
			callback(err, null)
			return
		}
		console.log('New Combatant: ' + combatant);
		combatants.push(combatant)
		callback(null, combatant)
	})
}

function encounterCreate(name, combatants, callback) {
	encounter_detail = { name: name, combatants: combatants }
	var encounter = new Encounter(encounter_detail);
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

function createCombatants(callback) {
	async.parallel([
		function (callback) {
			combatantCreate(heroes[0], 1, 9, 4, false, callback);
		},
		function (callback) {
			combatantCreate(heroes[3], 1, 12, 8, false, callback);
		},
		function (callback) {
			combatantCreate(monsters[0], 0, 64, 3, false, callback);
		},
	], callback);
}

function createEncouters(callback) {
	async.parallel([
		function (callback) {
			encounterCreate('The Kingkiller Chronicle', [combatants[0], combatants[1], combatants[2]], callback);
		}
	],
		// optional callback
		callback);
}

async.series([
	createMonsters,
	createHeroes,
	createCombatants,
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
