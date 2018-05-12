const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MonsterSchema = new Schema({
	name: { type: String },
	hitPoints: { type: Number },
	armorClass: { type: Number },
	initModifier: { type: Number }
});

module.exports = mongoose.model('Monster', MonsterSchema, 'monsters');