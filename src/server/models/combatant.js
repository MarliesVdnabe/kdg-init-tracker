const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CombatantSchema = new Schema({
	originalId: { type: String },
	name: { type: String },
	player: { type: String },
	type: { type: String },
	hitPoints: { type: Number },
	currentHitPoints: { type: Number },
	armorClass: { type: Number },
	initModifier: { type: Number },
	initiative: { type: Number },
	played: { type: Boolean }
});

module.exports = mongoose.model('Combatant', CombatantSchema, 'combatants');