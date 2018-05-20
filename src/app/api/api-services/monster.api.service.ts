import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { BaseRestApiService } from './base-rest.api.service';
import { RequestError } from '../models/request-error';
import { RequestResult } from '../models/request-result';
import { RequestResultType } from '../enums/request-result-type';
import { Hero } from '../models/hero';

@Injectable()
export class MonsterApiService extends BaseRestApiService {
	private monsterUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewMonster(monster): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.monsterUrl}/monster/create`, monster, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this.get(`${this.monsterUrl}/monsters/`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this.get(`${this.monsterUrl}/monster/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	updateMonster(monster: Hero): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.monsterUrl}/monster/${monster._id}/update`, monster, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
