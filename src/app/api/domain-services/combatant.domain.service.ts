import { Injectable } from '@angular/core';
import { CombatantApiService } from '../api-services/combatant.api.service';
import { RequestError } from '../models/request-error';
import { Observable } from 'rxjs/Observable';
import { Combatant } from '../models/combatant';

@Injectable()
export class CombatantDomainService {

	constructor(
		private _combatantApiService: CombatantApiService
	) { }

	createNewCombatants(combatant: Combatant): Observable<any | RequestError> {
		return this._combatantApiService.createNewCombatants(combatant);
	}

	getCombatant(id: string): Observable<any | RequestError> {
		return this._combatantApiService.getCombatant(id);
	}

}
