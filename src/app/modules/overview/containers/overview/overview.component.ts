import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss']
})

export class OverviewComponent implements OnInit {
	heroes: Hero[];
	monsters: Hero[];
	combatant: Hero;
	combatants = [];
	list: string;

	// STATE
	loaded: Boolean = false;
	enableCombatant: Boolean = false;

	constructor(
		private _overviewService: OverviewService
	) { }

	ngOnInit() {
		this.showMonsterList();
	}

	viewCombatant(event) {
		const combatant = event.item;
		if (combatant === 'monster') {
			this._overviewService.getMonster(event.id)
				.subscribe((monster: RequestResult<any | RequestError>) => {
					if (monster.requestResultType === RequestResultType.Data) {
						this.combatant = monster.data as Hero;
						this.enableCombatant = true;

					}
				});
		} else {
			console.log('HERO');
		}
	}

	showMonsterList() {
		this._overviewService.getAllMonsters()
			.subscribe((monsters: RequestResult<any | RequestError>) => {
				if (monsters.requestResultType === RequestResultType.Data) {
					this.monsters = monsters.data as Hero[];
					this.heroes = undefined;
					this.loaded = true;
				}
			});
	}

	showHeroesList() {
		this._overviewService.getAllHeroes()
			.subscribe((heroes: RequestResult<any | RequestError>) => {
				if (heroes.requestResultType === RequestResultType.Data) {
					this.heroes = heroes.data as Hero[];
					this.monsters = undefined;
					this.loaded = true;
				}
			});
	}

	selectedItem(event) {
		const combatant = event;
		// SEE IF COMBATANT IS ALREADY IN LIST
		for (let i = 0; i < this.combatants.length; i++) {
			if (this.combatants[i].details.name === combatant.details.name && !this.combatants[i].tempId) {
				combatant.tempId = 2;
			} else if (this.combatants[i].details.name === combatant.details.name && this.combatants[i].tempId) {
				combatant.tempId = this.combatants[i].tempId + 1;
			}
		}
		this.combatants.push(combatant);
	}

	startEncounter(event) {
		console.log(event);
	}
}
