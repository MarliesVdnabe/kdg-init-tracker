import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
