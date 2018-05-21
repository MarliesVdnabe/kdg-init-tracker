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

	createNewEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterApiService.createNewEncounter(encounter);
	}

	getAllEncounters(): Observable<any | RequestError> {
		return this._encounterApiService.getAllEncounters();
	}

	getEncounter(id: string): Observable<any | RequestError> {
		return this._encounterApiService.getEncounter(id);
	}

	saveEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterApiService.saveEncounter(encounter);
	}
}
