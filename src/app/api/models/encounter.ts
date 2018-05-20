import { Combatant } from './combatant';

export class Encounter {
	name: string;
	combatants: Combatant[];

	constructor(json: any) {
		this.name = json.name;
		this.combatants = json.combatants.map(combatant => new Combatant(combatant));
	}
}
