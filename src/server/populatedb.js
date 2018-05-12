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

function heroCreate(name, player, hitPoints, armorClass, initModifier, callback) {
	hero_detail = { name: name, hitPoints: hitPoints, armorClass: armorClass, initModifier: initModifier }
	if (player != false) {
		hero_detail.player = player;
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

function monsterCreate(name, hitPoints, armorClass, initModifier, callback) {
	monster_detail = { name: name, hitPoints: hitPoints, armorClass: armorClass, initModifier: initModifier }
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

function encounterCreate(name, monsters, heroes, callback) {
	encounter_detail = { name: name, monsters: monsters, heroes: heroes }

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
			monsterCreate('Red Dragon', 75, 17, -1, callback);
		},
		function (callback) {
			monsterCreate('Spider', 1, 12, 2, callback);
		},
		function (callback) {
			monsterCreate('Swarm of Poisonous Snakes', 36, 14, 5, callback);
		},
		function (callback) {
			monsterCreate('Vampire', 58, 15, 4, callback);
		},
		function (callback) {
			monsterCreate('Werewolf', 58, 11, 5, callback);
		},
		function (callback) {
			monsterCreate("Awakened Tree", 58, 11, 0, callback);
		},
		function (callback) {
			monsterCreate("Black Pudding", 168, 17, -3, callback);
		},
		function (callback) {
			monsterCreate("Flesh Golem", 93, 9, -1, callback);
		},
	],
		// optional callback
		cb);
}

function createHeroes(callback) {
	async.parallel([
		function (callback) {
			heroCreate('Hill Dwarf', false, 11, 18, -1, callback);
		},
		function (callback) {
			heroCreate('Underfoot', 'Jeroen', 9, 14, 3, callback);
		},
		function (callback) {
			heroCreate('Halfling', false, 12, 16, 3, callback);
		},
		function (callback) {
			heroCreate('Elf Wizard', false, 12, 22, 4, callback);
		},
		function (callback) {
			heroCreate('Human Fighter', false, 12, 17, 2, callback);
		},
	],
		// optional callback
		callback);
}


function createEncouters(callback) {
	async.parallel([
		function (callback) {
			encounterCreate('The Kingkiller Chronicle', [monsters[0], monsters[4]], [heroes[4], heroes[1], heroes[0]], callback);
		},
		function (callback) {
			encounterCreate('The Wizards Battle', [monsters[1], monsters[2]], [heroes[2], heroes[3], heroes[0]], callback);
		},
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
