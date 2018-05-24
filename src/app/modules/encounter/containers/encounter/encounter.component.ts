import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encounter } from '../../../../api/models/encounter';
import { SharedService } from '../../../shared/services/shared.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { CreatureTypeEnum } from '../../../../api/enums/creature-type';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-encounter',
	templateUrl: 'encounter.component.html'
})

export class EncounterComponent implements OnInit {
	snapshot;
	encounter: Encounter;
	combatants;
	creaturetypeEnum = CreatureTypeEnum;

	constructor(
		private _route: ActivatedRoute,
		private _sharedService: SharedService
	) {
		this.snapshot = this._route.snapshot;
	}

	ngOnInit() {
		this.encounter = this.snapshot.data.encounter.data;
		// this.getCombatantsFromEncounter(this.encounter);
		console.log('ENCOUNTER', this.encounter);
	}

	// getCombatantsFromEncounter(encounter) {
	// 	const encounterId = encounter._id;
	// 	this.combatants = [];
	// 	let combatant;
	// 	for (let i = 0; i < encounter.combatants.length; i++) {
	// 		this._sharedService.getCombatant(encounter.combatants[i])
	// 			.subscribe((combatnt: RequestResult<any | RequestError>) => {
	// 				if (combatnt.requestResultType === RequestResultType.Data) {
	// 					const cmb = combatnt.data /*as Combatant*/;
	// 					if (cmb.type === this.creaturetypeEnum.Monster) {
	// 						this._sharedService.getMonster(cmb.combatant[0])
	// 							.subscribe((monstr: RequestResult<any | RequestError>) => {
	// 								if (monstr.requestResultType === RequestResultType.Data) {
	// 									const monster = monstr.data as Hero;
	// 									combatant = { player: monster, game: cmb };
	// 									this.combatants.push(combatant);
	// 								} else {
	// 									console.log(monstr.data as RequestError);
	// 								}
	// 							});
	// 					} else {
	// 						this._sharedService.getHero(cmb.combatant[0])
	// 							.subscribe((her: RequestResult<any | RequestError>) => {
	// 								if (her.requestResultType === RequestResultType.Data) {
	// 									const hero = her.data as Hero;
	// 									combatant = { player: hero, game: cmb };
	// 									this.combatants.push(combatant);
	// 								}
	// 							});
	// 					}
	// 				} else {
	// 					console.log(combatnt.data as RequestError);
	// 				}
	// 			});
	// 	}
	// 	console.log(this.combatants);
	// }

	rollInitiative(initiative) {
		if (!initiative) {
			// ROLL initiative

			// TODO: Verander de models -->
			// Remove combatant model en sla de hero en monster op in de backend.
			// Sla ze met specs op in een encounter
		}
	}
}
