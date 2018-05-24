import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { BaseRestApiService } from './base-rest.api.service';
import { RequestError } from '../models/request-error';
import { RequestResult } from '../models/request-result';
import { RequestResultType } from '../enums/request-result-type';

@Injectable()
export class CombatantApiService extends BaseRestApiService {
	private combatantUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewCombatants(combatant): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.combatantUrl}/combatant/create`, combatant, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getCombatant(id: string): Observable<any | RequestError> {
		return this.get(`${this.combatantUrl}/combatant/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
