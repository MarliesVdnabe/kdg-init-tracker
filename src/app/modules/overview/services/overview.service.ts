import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../../../api/models/request-error';
import { CreatureTypeEnum } from '../../../api/enums/creature-type';
import { Hero } from '../../../api/models/hero';

import { HeroDomainService } from '../../../api/domain-services/hero.domain.service';
import { MonsterDomainService } from '../../../api/domain-services/monster.domain.service';
import { EncounterDomainService } from '../../../api/domain-services/encounter.domain.service';
import { Encounter } from '../../../api/models/encounter';
import { Monster } from '../../../api/models/monster';

@Injectable()
export class OverviewService {
	creaturetypeEnum = CreatureTypeEnum;

	constructor(
		private _heroService: HeroDomainService,
		private _monsterService: MonsterDomainService,
		private _encounterService: EncounterDomainService,
	) { }

	/* GENERAL */

	createItem(item) {
		if (item instanceof Monster) {
			return this.createNewMonster(item);
		} else if (item instanceof Hero) {
			return this.createNewHero(item);
		} else if (item instanceof Encounter) {
			console.log(item);
			return this.createNewEncounter(item);
		}
	}

	getAllListItems(monsterHeroOrEncounter: number) {
		if (monsterHeroOrEncounter === this.creaturetypeEnum.Monster) {
			return this.getAllMonsters();
		} else if (monsterHeroOrEncounter === this.creaturetypeEnum.Hero) {
			return this.getAllHeroes();
		} else {
			return this.getAllEncounters();
		}
	}

	getMonsterOrHero(player: Hero) {
		if (player.creatureType === this.creaturetypeEnum.Monster) {
			return this.getMonster(player._id);
		} else {
			return this.getHeroById(player._id);
		}
	}

	saveItem(item: Hero | Monster | Encounter) {
		if (item instanceof Hero) {
			return this.updateHero(item);
		} else if (item instanceof Monster) {
			return this.updateMonster(item);
		} else {
			return this.updateEncounter(item);
		}
	}

	// * HEROES * //
	createNewHero(hero: Hero): Observable<any | RequestError> {
		return this._heroService.createNewHero(hero);
	}

	getAllHeroes(): Observable<any | RequestError> {
		return this._heroService.getAllHeroes();
	}

	getHeroById(id: string): Observable<any | RequestError> {
		return this._heroService.getHero(id);
	}

	updateHero(hero: Hero): Observable<any | RequestError> {
		return this._heroService.updateHero(hero);
	}

	// * Monsters * //
	createNewMonster(monster: Monster): Observable<any | RequestError> {
		return this._monsterService.createNewMonster(monster);
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterService.getAllMonsters();
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterService.getMonster(id);
	}

	updateMonster(monster: Monster): Observable<any | RequestError> {
		return this._monsterService.updateMonster(monster);
	}

	/* ENCOUNTERS */

	createNewEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterService.createNewEncounter(encounter);
	}

	getAllEncounters(): Observable<any | RequestError> {
		return this._encounterService.getAllEncounters();
	}

	saveEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterService.saveEncounter(encounter);
	}

	updateEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterService.updateEncounter(encounter);
	}

	deleteEncounter(id: string): Observable<any | RequestError> {
		return this._encounterService.deleteEncounter(id);
	}
}
