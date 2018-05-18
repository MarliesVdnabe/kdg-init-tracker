import { Injectable } from '@angular/core';
import { MonsterApiService } from '../api-services/monster.api.service';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';

@Injectable()
export class MonsterDomainService {
	constructor(
		private _monsterApiService: MonsterApiService
	) { }


	// editMonster(id: string): Observable<any | RequestError> {
	// 	return this._monsterApiService.editMonster(id);
	// }

	getAllMonsters(): Observable<any | RequestError> {
		return this._monsterApiService.getAllMonsters();
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this._monsterApiService.getMonster(id);
	}
}
