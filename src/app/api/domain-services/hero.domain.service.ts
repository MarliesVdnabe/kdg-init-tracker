import { Injectable } from '@angular/core';
import { HeroApiService } from '../api-services/hero.api.service';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';

@Injectable()
export class HeroDomainService {
	constructor(
		private _heroApiService: HeroApiService
	) { }

	getAllHeroes(): Observable<any | RequestError> {
		return this._heroApiService.getAllHeroes();
	}
}
