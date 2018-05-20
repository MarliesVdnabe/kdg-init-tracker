const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CombatantSchema = new Schema({
	combatant: [{ type: Schema.ObjectId, ref: 'Hero' }],
	type: { type: Number },
	currentHitPoints: { type: Number },
	initiative: { type: Number },
	played: { type: Boolean }
});

module.exports = mongoose.model('Combatant', CombatantSchema, 'combatants');