const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
	name: { type: String },
	combatants: [{ type: Schema.ObjectId, ref: 'Combatant' }],
});

module.exports = mongoose.model('Encounter', EncounterSchema, 'encounters');
