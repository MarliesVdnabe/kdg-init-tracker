import { EncounterHero } from './hero';
import { EncounterMonster } from './monster';

export class Encounter {
	_id?: string;
	name?: string;
	heroes: EncounterHero[];
	monsters: EncounterMonster[];

	constructor(json?: any) {
		if (json) {
			this._id = json._id;
			this.name = json.name;
			this.heroes = json.heroes;
			this.monsters = json.monsters;
		}
	}
}
