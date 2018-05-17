import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
