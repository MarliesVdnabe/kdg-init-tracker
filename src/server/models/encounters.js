const mongoose = require('mongoose');
const EncounterHero = require('./heroes').EncounterHero;
const EncounterMonster = require('./monsters').EncounterMonster;
const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
	name: { type: String, required: true },
	heroes: [EncounterHero],
	monsters: [EncounterMonster]
});

module.exports.Encounter = mongoose.model('Encounter', EncounterSchema, 'encounters');
