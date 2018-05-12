const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
	name: { type: String },
	player: { type: String },
	hitPoints: { type: Number },
	armorClass: { type: Number },
	initModifier: { type: Number }
});

module.exports = mongoose.model('Hero', HeroSchema, 'heroes');
