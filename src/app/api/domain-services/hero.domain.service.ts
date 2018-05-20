import { Injectable } from '@angular/core';
import { HeroApiService } from '../api-services/hero.api.service';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';
import { Hero } from '../models/hero';

@Injectable()
export class HeroDomainService {
	constructor(
		private _heroApiService: HeroApiService
	) { }

	createNewHero(hero: Hero): Observable<any | RequestError> {
		return this._heroApiService.createNewHero(hero);
	}

	getAllHeroes(): Observable<any | RequestError> {
		return this._heroApiService.getAllHeroes();
	}

	getHero(id: string): Observable<any | RequestError> {
		return this._heroApiService.getHero(id);
	}

	updateHero(hero: Hero): Observable<any | RequestError> {
		return this._heroApiService.updateHero(hero);
	}
}
