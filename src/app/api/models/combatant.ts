import { PlayerType } from '../enums/player-type';

export class Combatant {
	id: string;
	combatant: string;
	type: PlayerType;
	initiative: number;
	played: boolean;

	constructor(json?: any) {
		this.id = json.id;
		this.combatant = json.combatant;
		this.type = json.type;
		this.initiative = json.initiative;
		this.played = json.played;
	}
}
