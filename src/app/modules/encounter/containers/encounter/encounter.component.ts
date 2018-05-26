import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Encounter } from '../../../../api/models/encounter';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { CreatureTypeEnum } from '../../../../api/enums/creature-type';
import { EncounterHero } from '../../../../api/models/hero';
import { EncounterMonster } from '../../../../api/models/monster';
import { EncounterService } from '../../services/encounter.service';

@Component({
	selector: 'app-encounter',
	templateUrl: 'encounter.component.html',
	styleUrls: ['./encounter.component.scss']
})

export class EncounterComponent implements OnInit {
	snapshot;
	encounterItems = [];
	encounter: Encounter;
	creaturetypeEnum = CreatureTypeEnum;
	activePlayer: EncounterHero | EncounterMonster;
	detailsItem: EncounterHero | EncounterMonster;
	playedIndex: number;
	wonOrLost = undefined;

	// State
	rollInit = false;
	showActivePlayer = false;
	showDetailsPlayer = false;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _encounterService: EncounterService
	) {
		this.snapshot = this._route.snapshot;
	}

	ngOnInit() {
		this.encounter = this.snapshot.data.encounter.data;
		this.encounterToListItems();
		const init = this.encounterItems.filter(x => (x.initiative === 0));
		if (init.length === this.encounterItems.length) {
			this.rollInitiative();
		}
	}

	actionClicked(action) {
		// Create temp list to skip the disabled monsters
		const tempEncounterItems = this.encounterItems.filter(i => i.originalItem.creatureType === 1
			|| i.originalItem.creatureType === 0 && i.visible);
		this.checkGameState(tempEncounterItems);
		switch (action) {
			case 'start':
				const item = tempEncounterItems.find(x => x.played === true);
				if (item) {
					this.playedIndex = tempEncounterItems.indexOf(item);
				} else {
					this.playedIndex = 0;
				}
				tempEncounterItems[this.playedIndex].played = true;
				this.showActivePlayer = true;
				this.activePlayer = tempEncounterItems[this.playedIndex];
				break;
			case 'next':
				let prevIndex = this.playedIndex;
				this.playedIndex = this.playedIndex + 1;
				if (this.playedIndex === tempEncounterItems.length) {
					this.playedIndex = 0;
					prevIndex = tempEncounterItems.length - 1;
				}
				tempEncounterItems[this.playedIndex].played = true;
				tempEncounterItems[prevIndex].played = false;
				this.activePlayer = tempEncounterItems[this.playedIndex];
				this.updateEncounter();
				break;
			case 'prev':
				this.playedIndex = this.playedIndex - 1;
				const prevIndx = this.playedIndex + 1;
				if (this.playedIndex < 0) {
					this.playedIndex = tempEncounterItems.length - 1;
				}
				tempEncounterItems[this.playedIndex].played = true;
				tempEncounterItems[prevIndx].played = false;
				this.activePlayer = tempEncounterItems[this.playedIndex];
				this.updateEncounter();
				break;
			case 'stop':
				this.showActivePlayer = false;
				this.activePlayer = null;
				this.showDetailsPlayer = false;
				break;
			default:
				break;
		}
	}

	cancel() {
		this.showDetailsPlayer = false;
	}

	checkGameState(encounterList) {
		this.encounterItems.forEach(e => {
			if (e.originalItem.creatureType === 1) {
				e.visible = true;
			}
		});
		const activeMonsters = encounterList.filter(m => m.currentHitPoints > 0 && m.originalItem.creatureType === 0);
		const activeHeroes = encounterList.filter(m => m.currentHitPoints > 0 && m.originalItem.creatureType === 1);
		if (!activeMonsters.length) {
			this.wonOrLost = 'won';
		}
		if (!activeHeroes.length) {
			this.wonOrLost = 'lost';
		}
		// Skip items that have current hitpoint = 0
		const inactivePlayers = encounterList.filter(m => m.currentHitPoints === 0);
		inactivePlayers.forEach(el => {
			el.visible = false;
		});
		for (let i = 0; i < inactivePlayers.length; i++) {
			const item = encounterList.find(x => x._id === inactivePlayers[i]._id);
			const index = encounterList.indexOf(item);
			encounterList.splice(index, 1);
		}
	}

	closeEncounter() {
		this._router.navigate(['/overview']);
	}

	encounterToListItems() {
		const heroes: EncounterHero[] = this.encounter.heroes;
		const monsters: EncounterMonster[] = this.encounter.monsters;
		if (!heroes.length) {
			return;
		}
		if (!monsters.length) {
			return;
		}
		for (let i = 0; i < heroes.length; i++) {
			this.encounterItems.push(heroes[i]);
		}
		for (let j = 0; j < monsters.length; j++) {
			this.encounterItems.push(monsters[j]);
		}
	}

	removeItemFromEncounter(index) {
		this.encounterItems.splice(index, 1);
		const heroes: EncounterHero[] = this.encounterItems.filter(x => x.originalItem.creatureType === 1);
		const monsters: EncounterMonster[] = this.encounterItems.filter(x => x.originalItem.creatureType === 0);
		this.encounter.monsters = monsters;
		this.encounter.heroes = heroes;
		this.updateEncounter();
	}

	rollInitiative() {
		this.encounterItems.forEach(a => {
			const random = Math.floor(Math.random() * Math.floor(20)) + 1;
			a.initiative = random + a.originalItem.initModifier;
		});
		this.rollInit = true;
	}

	saveDamageOrHeal(damageOrHeal) {
		const id = this.detailsItem.originalItem._id;
		const itemToDamage = this.encounterItems.find(x => x.originalItem._id === id);
		itemToDamage.currentHitPoints = itemToDamage.currentHitPoints + (damageOrHeal);
		if (itemToDamage.currentHitPoints > itemToDamage.originalItem.hitPoints) {
			itemToDamage.currentHitPoints = itemToDamage.originalItem.hitPoints;
		} else if (itemToDamage.currentHitPoints < 0) {
			itemToDamage.currentHitPoints = 0;
		}
		this.updateEncounter();
	}

	showDetailsItem(item) {
		this.showDetailsPlayer = true;
		setTimeout(() => {
			console.log('start timer');
			this.showDetailsPlayer = false;
		}, 30000);
		this.detailsItem = item;
	}

	updateEncounter() {
		this._encounterService.updateEncounter(this.encounter)
			.subscribe((updatedEncounter: RequestResult<any | RequestError>) => {
				if (updatedEncounter.requestResultType === RequestResultType.Data) {
					this.encounterItems = [];
					this.encounter = updatedEncounter.data;
					this.encounterToListItems();
					this.rollInit = false;
				} else {
					console.log(updatedEncounter.data as RequestError);
				}
			});
	}
}
