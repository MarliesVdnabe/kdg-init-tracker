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
	private heroUrl: string = environment.apiUrl;

	constructor(
		http: HttpClient
	) {
		super(http);
	}

	createNewHero(hero: Hero): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.heroUrl}/hero/create`, hero, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getAllHeroes(): Observable<any | RequestError> {
		return this.get(`${this.heroUrl}/heroes`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	getHero(id: string): Observable<any | RequestError> {
		return this.get(`${this.heroUrl}/hero/${id}`)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}

	updateHero(hero: Hero): Observable<any | RequestError> {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.post(`${this.heroUrl}/hero/${hero._id}/update`, hero, headers)
			.map((result: RequestResult<any | RequestError>) => {
				if (result.requestResultType === RequestResultType.Data) {
					return new RequestResult(result.requestResultType, result.data);
				} else {
					return result.data as RequestResult<RequestError>;
				}
			});
	}
}
