import { PlayerType } from '../enums/player-type';

export class Hero {
	_id?: string;
	name: string;
	player?: string;
	type: PlayerType;
	hitPoints: number;
	armorClass: number;
	initModifier: number;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.name = json.name;
			this.player = json.player;
			this.type = json.type;
			this.hitPoints = json.hitPoints;
			this.armorClass = json.armorClass;
			this.initModifier = json.initModifier;
		}

	}
}
