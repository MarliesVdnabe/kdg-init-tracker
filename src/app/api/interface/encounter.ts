import { IHero } from './hero';

export interface IEncounter {
	name: string;
	monsters: IHero[];
	heroes: IHero[];
}
