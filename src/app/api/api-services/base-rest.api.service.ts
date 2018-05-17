import { Injectable, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestError } from '../models/request-error';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { RequestResult } from '../models/request-result';
import { RequestResultType } from '../enums/request-result-type';
import { handleHttpErrorResponse } from '../../utils/error-handling';

@Injectable()
export abstract class BaseRestApiService {
	constructor(private http: HttpClient) { }

	protected get(relativeUrl: string, headers?: HttpHeaders): Observable<any | RequestError> {
		return this.http.get(relativeUrl)
			.map(res => new RequestResult(RequestResultType.Data, res))
			.catch(handleHttpErrorResponse);
	}
}
