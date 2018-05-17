import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HeroDomainService } from '../../../api/domain-services/hero.domain.service';
import { RequestError } from '../../../api/models/request-error';
import { MonsterDomainService } from '../../../api/domain-services/monster.domain.service';

@Injectable()
export class OverviewService {

	constructor(
		private _heroService: HeroDomainService,
		private _monsterService: MonsterDomainService
	) { }

	getAllHeroes(): Observable<any | RequestError> {
		return this._heroService.getAllHeroes();
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterService.getAllMonsters();
	}
}
