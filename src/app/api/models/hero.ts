import { CreatureTypeEnum } from '../enums/creature-type';

export class Hero {
	_id?: string;
	name: string;
	player: string;
	creatureType: CreatureTypeEnum;
	hitPoints: number;
	armorClass: number;
	initModifier: number;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.name = json.name;
			this.player = json.player;
			this.creatureType = json.creatureType;
			this.hitPoints = json.hitPoints;
			this.armorClass = json.armorClass;
			this.initModifier = json.initModifier;
		}
	}
}

export class EncounterHero {
	_id?: string;
	originalItem: Hero;
	currentHitPoints: number;
	currentArmorClass: number;
	played: boolean;
	initiative: number;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.originalItem = json.originalHero;
			this.currentHitPoints = json.currentHitPoints;
			this.currentArmorClass = json.currentArmorClass;
			this.played = json.played;
			this.initiative = json.initiative;
		}
	}
}
