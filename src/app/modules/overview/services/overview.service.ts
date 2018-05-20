import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../../../api/models/request-error';
import { HeroDomainService } from '../../../api/domain-services/hero.domain.service';
import { MonsterDomainService } from '../../../api/domain-services/monster.domain.service';
import { PlayerType } from '../../../api/enums/player-type';
import { Hero } from '../../../api/models/hero';

@Injectable()
export class OverviewService {
	playerType = PlayerType;
	constructor(
		private _heroService: HeroDomainService,
		private _monsterService: MonsterDomainService
	) { }

	/* GENERAL */
	createNewPlayer(player: Hero) {
		if (player.type === this.playerType.Monster) {
			return this.createNewMonster(player);
		} else {
			return this.createNewHero(player);
		}
	}

	getAllMonstersOrHeroes(monsterOrHero: number) {
		if (monsterOrHero === this.playerType.Monster) {
			return this.getAllMonsters();
		} else {
			return this.getAllHeroes();
		}
	}

	getMonsterOrHero(player: Hero) {
		if (player.type === this.playerType.Monster) {
			return this.getMonster(player._id);
		} else {
			return this.getHero(player._id);
		}
	}

	updateMonsterOrHero(player: Hero) {
		if (player.type === this.playerType.Monster) {
			return this.updateMonster(player);
		} else {
			return this.updateHero(player);
		}
	}

	// * HEROES * //
	createNewHero(hero: Hero): Observable<any | RequestError> {
		return this._heroService.createNewHero(hero);
	}

	getAllHeroes(): Observable<any | RequestError> {
		return this._heroService.getAllHeroes();
	}

	getHero(id: string): Observable<any | RequestError> {
		return this._heroService.getHero(id);
	}

	updateHero(hero: Hero): Observable<any | RequestError> {
		return this._heroService.updateHero(hero);
	}

	// * Monsters * //
	createNewMonster(monster: Hero): Observable<any | RequestError> {
		return this._monsterService.createNewMonster(monster);
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterService.getAllMonsters();
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterService.getMonster(id);
	}

	updateMonster(monster: Hero): Observable<any | RequestError> {
		return this._monsterService.updateMonster(monster);
	}
}
