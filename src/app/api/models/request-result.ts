import { RequestResultType } from '../enums/request-result-type';

export class RequestResult<T> {
	requestResultType: RequestResultType;
	data: T;
	constructor(requestResultType: RequestResultType);
	constructor(requestResultType: RequestResultType, data: T);
	constructor(requestResultTypeOrData?: any, data?: T) {
		if (data) {
			this.requestResultType = requestResultTypeOrData;
			this.data = data;
		} else {
			this.requestResultType = requestResultTypeOrData;
		}
	}
}
