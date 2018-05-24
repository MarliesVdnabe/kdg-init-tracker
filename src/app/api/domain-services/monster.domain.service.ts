import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';
import { MonsterApiService } from '../api-services/monster.api.service';
import { Monster } from '../models/monster';

@Injectable()
export class MonsterDomainService {
	constructor(
		private _monsterApiService: MonsterApiService
	) { }

	createNewMonster(monster: Monster): Observable<any | RequestError> {
		return this._monsterApiService.createNewMonster(monster);
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterApiService.getAllMonsters();
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterApiService.getMonster(id);
	}

	updateMonster(monster: Monster): Observable<any | RequestError> {
		return this._monsterApiService.updateMonster(monster);
	}
}
