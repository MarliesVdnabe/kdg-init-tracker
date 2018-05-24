import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Hero } from '../models/hero';
import { RequestResult } from '../models/request-result';
import { RequestError } from '../models/request-error';
import { RequestResultType } from '../enums/request-result-type';
import { BaseRestApiService } from './base-rest.api.service';

@Injectable()
export class HeroApiService extends BaseRestApiService {
	private backendUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewHero(hero: Hero): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/hero/create`, hero)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Hero(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllHeroes(): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/heroes`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, (result.data as Hero[]).map((hero: any) => new Hero(hero)));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getHero(id: string): Observable<any | RequestError> {
		return this.get(`${this.backendUrl}/hero/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Hero(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	updateHero(hero: Hero): Observable<any | RequestError> {
		return this.post(`${this.backendUrl}/hero/${hero._id}/update`, hero)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, new Hero(result.data));
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
