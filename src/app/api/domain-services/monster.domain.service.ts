import { Injectable } from '@angular/core';
import { MonsterApiService } from '../api-services/monster.api.service';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';
import { Hero } from '../models/hero';

@Injectable()
export class MonsterDomainService {
	constructor(
		private _monsterApiService: MonsterApiService
	) { }

	createNewMonster(monster: Hero): Observable<any | RequestError> {
		return this._monsterApiService.createNewMonster(monster);
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterApiService.getAllMonsters();
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterApiService.getMonster(id);
	}

	updateMonster(monster: Hero): Observable<any | RequestError> {
		return this._monsterApiService.updateMonster(monster);
	}
}
