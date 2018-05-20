import { Injectable } from '@angular/core';
import { EncounterApiService } from '../api-services/encounter.api.service';
import { Observable } from 'rxjs/Observable';
import { RequestError } from '../models/request-error';
import { Encounter } from '../models/encounter';

@Injectable()
export class EncounterDomainService {

	constructor(
		private _encounterApiService: EncounterApiService
	) { }

	getAllEncounters(): Observable<any | RequestError> {
		return this._encounterApiService.getAllEncounters();
	}

	saveEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterApiService.saveEncounter(encounter);
	}
}
