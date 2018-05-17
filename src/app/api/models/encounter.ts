import { Hero } from './hero';

export class Encounter {
	name: string;
	monsters: Hero[];
	heroes: Hero[];

	constructor(json: any) {
		this.name = json.name;
		this.monsters = json.monsters;
		this.heroes = json.heroes;
	}
}
