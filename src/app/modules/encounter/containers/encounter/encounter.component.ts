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

	// State
	rollInit = false;
	showActivePlayer = false;
	showDetailsPlayer = false;

	constructor(
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
		console.log(this.encounterItems);
	}

	actionClicked(action) {
		if (action === 'start') {
			const item = this.encounterItems.find(x => x.played === true);
			this.playedIndex = this.encounterItems.indexOf(item);
			this.encounterItems[this.playedIndex].played = true;
			this.showActivePlayer = true;
			this.activePlayer = this.encounterItems[this.playedIndex];
		} else if (action === 'next') {
			this.playedIndex = this.playedIndex + 1;
			let prevIndex = this.playedIndex - 1;
			if (this.playedIndex === this.encounterItems.length) {
				this.playedIndex = 0;
				prevIndex = this.encounterItems.length - 1;
			}
			this.encounterItems[this.playedIndex].played = true;
			this.encounterItems[prevIndex].played = false;
			this.activePlayer = this.encounterItems[this.playedIndex];
			this.updateEncounter();
		} else if (action === 'prev') {
			this.playedIndex = this.playedIndex - 1;
			const prevIndex = this.playedIndex + 1;
			if (this.playedIndex < 0) {
				this.playedIndex = this.encounterItems.length - 1;
			}
			this.encounterItems[this.playedIndex].played = true;
			this.encounterItems[prevIndex].played = false;
			this.activePlayer = this.encounterItems[this.playedIndex];
			this.updateEncounter();
		} else if (action === 'stop') {
			this.showActivePlayer = false;
			this.activePlayer = null;
			this.showDetailsPlayer = false;
		}
	}

	cancel() {
		this.showDetailsPlayer = false;
	}

	encounterToListItems() {
		const heroes: EncounterHero[] = this.encounter.heroes;
		const monsters: EncounterMonster[] = this.encounter.monsters;
		for (let i = 0; i < heroes.length; i++) {
			this.encounterItems.push(heroes[i]);
		}
		for (let j = 0; j < monsters.length; j++) {
			this.encounterItems.push(monsters[j]);
		}
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

	showDetailsItem(item) {
		this.showDetailsPlayer = true;
		this.detailsItem = item;
	}
}
