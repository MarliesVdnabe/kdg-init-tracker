import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { Hero, EncounterHero } from '../../../../api/models/hero';
import { CreatureTypeEnum } from '../../../../api/enums/creature-type';
import { Encounter } from '../../../../api/models/encounter';
import { Router } from '@angular/router/';
import { Monster, EncounterMonster } from '../../../../api/models/monster';

@Component({
	selector: 'app-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss']
})

export class OverviewComponent implements OnInit {
	items: Hero[] | Monster[] | Encounter[];
	encounter = new Encounter({
		heroes: [],
		monsters: []
	});
	encounterItems = [];
	item: Hero | Monster | Encounter;
	updatedItem: Hero | Monster | Encounter = null;
	createItem: number;
	lastListClicked: number;

	// Enums
	creaturetypeEnum = CreatureTypeEnum;

	// STATE
	showEncounter = false;
	showCreateMonsterHeroOrEncounter = false;
	listLoaded = false;
	editLoaded = false;
	encounterLoaded: Boolean = false;

	constructor(
		private _overviewService: OverviewService,
		private _router: Router,
	) { }

	ngOnInit() {
		this.showListItems(0);
	}

	addItemToInitiative(item) {
		this.showEncounter = true;
		if (item instanceof Hero) {
			const newHero: EncounterHero = {
				originalItem: item,
				currentHitPoints: item.hitPoints,
				currentArmorClass: item.armorClass,
				played: false,
				initiative: 0
			};
			this.encounterItems.push(newHero);
			this.encounter.heroes.push(newHero);
		} else if (item instanceof Monster) {
			const newMonster: EncounterMonster = {
				originalItem: item,
				currentHitPoints: item.hitPoints,
				currentArmorClass: item.armorClass,
				played: false,
				initiative: 0,
				visible: true
			};
			this.encounterItems.push(newMonster);
			this.encounter.monsters.push(newMonster);
		} else {
			this.encounterItems = [];
			for (let i = 0; i < item.heroes.length; i++) {
				this.encounterItems.push(item.heroes[i]);
			}
			for (let j = 0; j < item.monsters.length; j++) {
				this.encounterItems.push(item.monsters[j]);
			}
			this.encounter = item;
		}
	}

	cancel() {
		this.editLoaded = false;
		this.showCreateMonsterHeroOrEncounter = false;
	}

	createNewItem(monsterOrHero) {
		this.showCreateMonsterHeroOrEncounter = true;
		this.createItem = monsterOrHero;
		this.item = null;
	}

	editItem(item) {
		this.editLoaded = true;
		this.item = item;
		this.createItem = null;
	}

	giveNewEncounterName() {
		this.showCreateMonsterHeroOrEncounter = true;
		this.createItem = 2;
	}

	removeItem(itemList) {
		const heroes = this.encounterItems.filter(x => x.originalItem instanceof Hero) as EncounterHero[];
		const monsters = this.encounterItems.filter(y => y.originalItem instanceof Monster) as EncounterMonster[];
		this.encounter.heroes = heroes;
		this.encounter.monsters = monsters;
	}

	saveOrCreateItem(item) {
		if (item._id) {
			this._overviewService.saveItem(item)
				.subscribe((updatdItem: RequestResult<any | RequestError>) => {
					if (updatdItem.requestResultType === RequestResultType.Data) {
						this.updatedItem = updatdItem.data as Hero | Encounter | Monster;
						this.editLoaded = false;
					} else {
						console.log(updatdItem.data as RequestError);
					}
				});
		} else {
			if (item instanceof Encounter) {
				item.heroes = this.encounter.heroes;
				item.monsters = this.encounter.monsters;
			}
			this._overviewService.createItem(item)
				.subscribe((newItm: RequestResult<any | RequestError>) => {
					if (newItm.requestResultType === RequestResultType.Data) {
						const newItem = newItm.data;
						this.showListItems(this.lastListClicked);
						this.showCreateMonsterHeroOrEncounter = false;
					} else {
						console.log(newItm.data as RequestError);
					}
				});
		}
	}

	showListItems(monsterHeroOrEncounter: number) {
		this.lastListClicked = monsterHeroOrEncounter;
		this._overviewService.getAllListItems(monsterHeroOrEncounter)
			.subscribe((it: RequestResult<any | RequestError>) => {
				if (it.requestResultType === RequestResultType.Data) {
					this.items = it.data as Monster[] | Hero[] | Encounter[];
					this.encounterLoaded = false;
					this.listLoaded = true;
				} else {
					console.log(it.data as RequestError);
				}
			});
	}

	startEncounter() {
		if (this.encounter.name && this.encounter._id) {
			this._router.navigate(['/encounter', this.encounter._id]);
		} else {
			this.encounter.name = 'in Progress';
			this._overviewService.createNewEncounter(this.encounter)
				.subscribe((result: RequestResult<any | RequestError>) => {
					const encounter = result.data;
					this._router.navigate(['/encounter', encounter._id]);
				});
		}
	}
}
