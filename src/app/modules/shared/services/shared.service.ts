import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../../../api/models/request-error';
import { CombatantDomainService } from '../../../api/domain-services/combatant.domain.service';
import { MonsterDomainService } from '../../../api/domain-services/monster.domain.service';
import { HeroDomainService } from '../../../api/domain-services/hero.domain.service';

@Injectable()
export class SharedService {

	constructor(
		private _combatantService: CombatantDomainService,
		private _monsterService: MonsterDomainService,
		private _heroService: HeroDomainService
	) { }

	getCombatant(id: string): Observable<any | RequestError> {
		return this._combatantService.getCombatant(id);
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterService.getMonster(id);
	}

	getHero(id: string): Observable<any | RequestError> {
		return this._heroService.getHero(id);
	}
}
