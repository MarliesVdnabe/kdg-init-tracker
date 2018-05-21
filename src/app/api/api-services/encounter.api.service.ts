import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { BaseRestApiService } from './base-rest.api.service';
import { environment } from '../../../environments/environment';
import { RequestError } from '../models/request-error';
import { RequestResult } from '../models/request-result';
import { RequestResultType } from '../enums/request-result-type';
import { Encounter } from '../models/encounter';

@Injectable()
export class EncounterApiService extends BaseRestApiService {
	private encounterUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this.post(`${this.encounterUrl}/encounter/create`, encounter)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllEncounters(): Observable<any | RequestError> {
		return this.get(`${this.encounterUrl}/encounters`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getEncounter(id: string): Observable<any | RequestError> {
		return this.get(`${this.encounterUrl}/encounter/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	saveEncounter(encounter: Encounter): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.encounterUrl}/encounter/${encounter._id}/update`, encounter, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
