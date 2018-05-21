import { Combatant } from './combatant';

export class Encounter {
	_id?: string;
	name: string;
	combatants: Combatant[];

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.name = json.name;
			this.combatants = json.combatants.map(combatant => new Combatant(combatant));
		}
	}
}
