import { PlayerType } from '../enums/player-type';
import { Hero } from './hero';

export class Combatant {
	_id?: string;
	combatant: string[] | Hero;
	type: PlayerType;
	initiative: number;
	played: boolean;
	currentHitPoints: number;

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.combatant = json.combatant;
			this.type = json.type;
			this.initiative = json.initiative;
			this.played = json.played;
			this.currentHitPoints = json.currentHitPoints;
		}
	}
}
