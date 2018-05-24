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
	private backendUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/encounter/create`, encounter)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Encounter(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllEncounters(): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/encounters`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, (result.data as Encounter[]).map((encounter: any) => new Encounter(encounter)));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}


	// Niet gebruikt?
	getEncounter(id: string): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/encounter/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	saveEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/encounter/${encounter._id}/save`, encounter)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	updateEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/encounter/${encounter._id}/update`, encounter)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});

	}
}
