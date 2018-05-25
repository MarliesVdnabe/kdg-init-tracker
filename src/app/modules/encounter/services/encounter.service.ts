import { Injectable } from '@angular/core';
import { RequestError } from '../../../api/models/request-error';
import { Encounter } from '../../../api/models/encounter';
import { Observable } from 'rxjs/Observable';
import { EncounterDomainService } from '../../../api/domain-services/encounter.domain.service';

@Injectable()
export class EncounterService {

	constructor(
		private _encounterService: EncounterDomainService,
	) { }

	updateEncounter(encounter: Encounter): Observable<any | RequestError> {
		return this._encounterService.updateEncounter(encounter);
	}
}
