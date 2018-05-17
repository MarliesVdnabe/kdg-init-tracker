import { RequestErrorItem } from './request-error-item';

export class RequestError {
	status: number;
	errors: RequestErrorItem[];

	constructor(status: number, errors: RequestErrorItem[]) {
		const distinct: RequestErrorItem[] = [];
		const messages: string[] = [];
		for (let i = 0; i < errors.length; i++) {
			if (messages.indexOf(errors[i].message) === -1) {
				distinct.push(errors[i]);
				messages.push(errors[i].message);
			}
		}

		this.status = status;
		this.errors = distinct;
	}
}
