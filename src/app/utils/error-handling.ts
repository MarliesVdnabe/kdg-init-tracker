import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { RequestError } from '../api/models/request-error';
import { RequestResult } from '../api/models/request-result';
import { RequestErrorItem } from '../api/models/request-error-item';
import { RequestResultType } from '../api/enums/request-result-type';

export function handleHttpErrorResponse(response: HttpErrorResponse): Observable<RequestResult<RequestError>> {
	let requestError: RequestError;
	if (response.error instanceof Error) {
		requestError = new RequestError(response.status, [new RequestErrorItem(response.error.name, response.error.message)]);
	}
	// else if (response.error && response.error.error) {
	// 	requestError = new RequestError(response.status, [new RequestErrorItem(response.error.error, response.error.messag)
	// }
	return Observable.of(new RequestResult(RequestResultType.Error, requestError));
}
