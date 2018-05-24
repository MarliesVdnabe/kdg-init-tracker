import { CreatureTypeEnum } from '../enums/creature-type';

export class Monster {
	_id?: string;
	name: string;
	creatureType: CreatureTypeEnum;
	hitPoints: number;
	armorClass: number;
	initModifier: number;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.name = json.name;
			this.creatureType = json.creatureType;
			this.hitPoints = json.hitPoints;
			this.armorClass = json.armorClass;
			this.initModifier = json.initModifier;
		}
	}
}

export class EncounterMonster {
	_id?: string;
	originalItem: Monster;
	currentHitPoints: number;
	currentArmorClass: number;
	played: boolean;
	initiative: number;
	visible: boolean;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.originalItem = json.originalMonster;
			this.currentHitPoints = json.currentHitpoints;
			this.currentArmorClass = json.currentArmorClass;
			this.played = json.played;
			this.initiative = json.initiative;
			this.visible = json.visible;
		}
	}
}
