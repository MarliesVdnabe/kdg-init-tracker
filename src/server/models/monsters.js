const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
	name: { type: String, required: true },
	creatureType: { type: Number, required: true },
	hitPoints: { type: Number, required: true },
	armorClass: { type: Number, required: true },
	initModifier: { type: Number, required: true }
});
module.exports = mongoose.model('Monster', MonsterSchema, 'monsters');

const EncounterMonsterSchema = new Schema({
	originalItem: MonsterSchema,
	played: { type: Boolean, required: true },
	currentHitPoints: { type: Number, required: true },
	currentArmorClass: { type: Number, required: true },
	initiative: { type: Number, required: true },
	visible: { type: Boolean, required: true }
})
module.exports.EncounterMonster = EncounterMonsterSchema;
