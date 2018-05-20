import { PlayerType } from '../enums/player-type';

export class Combatant {
	id: string;
	combatant: string[];
	type: PlayerType;
	initiative: number;
	played: boolean;
	currentHitPoints: number;

	constructor(json?: any) {
		if (json) {
			this.id = json.id;
			this.combatant = json.combatant;
			this.type = json.type;
			this.initiative = json.initiative;
			this.played = json.played;
			this.currentHitPoints = json.currentHitPoints;
		}
	}
}
