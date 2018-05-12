const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EncounterSchema = new Schema({
	name: { type: String },
	monsters: [{ type: Schema.ObjectId, ref: 'Monster' }],
	heroes: [{ type: Schema.ObjectId, ref: 'Hero' }]
}, { versionKey: false });

module.exports = mongoose.model('Encounter', EncounterSchema);
