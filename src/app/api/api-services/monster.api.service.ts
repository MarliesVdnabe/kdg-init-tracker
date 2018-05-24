import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { BaseRestApiService } from './base-rest.api.service';
import { RequestError } from '../models/request-error';
import { RequestResult } from '../models/request-result';
import { RequestResultType } from '../enums/request-result-type';
import { Monster } from '../models/monster';

@Injectable()
export class MonsterApiService extends BaseRestApiService {
	private backendUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewMonster(monster): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/monster/create`, monster)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Monster(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllMonsters(): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/monsters/`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, (result.data as Monster[]).map((monster: any) => new Monster(monster)));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getMonster(id: string): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/monster/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data as Monster);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	updateMonster(monster: Monster): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/monster/${monster._id}/update`, monster)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Monster(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
