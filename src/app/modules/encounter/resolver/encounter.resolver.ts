import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EncounterDomainService } from '../../../api/domain-services/encounter.domain.service';


@Injectable()
export class EncounterResolver implements Resolve<any> {

	constructor(
		private _router: Router,
		private _encounterService: EncounterDomainService
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any> {
		const id = route.paramMap.get('id');

		return this._encounterService.getEncounter(id)
			.map(encounter => {
				if (encounter) {
					return encounter;
				} else {
					return null;
				}
			});
	}
}
