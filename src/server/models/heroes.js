const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeroSchema = new Schema({
	name: { type: String, required: true },
	player: { type: String },
	creatureType: { type: Number, required: true },
	hitPoints: { type: Number, required: true },
	armorClass: { type: Number, required: true },
	initModifier: { type: Number, required: true }
});
module.exports = mongoose.model('Hero', HeroSchema, 'heroes');

const EncounterHeroSchema = new Schema({
	originalItem: HeroSchema,
	currentHitPoints: { type: Number, required: true },
	currentArmorClass: { type: Number, required: true },
	played: { type: Boolean, required: true },
	initiative: { type: Number, required: true },
})
module.exports.EncounterHero = EncounterHeroSchema;

