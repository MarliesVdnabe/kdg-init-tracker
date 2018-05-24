import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Encounter } from '../../../../api/models/encounter';
import { EncounterMonster, Monster } from '../../../../api/models/monster';
import { EncounterHero, Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-initiative-table',
	templateUrl: './initiative-table.component.html',
	styleUrls: ['./initiative-table.component.scss']
})

export class InitiativeTableComponent implements OnChanges {
	@Input() encounterItems;
	@Input() updatedItem: Hero | Encounter | Monster;
	@Output() onRemoveItem: EventEmitter<null> = new EventEmitter();
	@Output() onStartEncounter: EventEmitter<null> = new EventEmitter();
	@Output() onSaveEncounter: EventEmitter<null> = new EventEmitter();

	constructor() { }

	ngOninit() { }

	ngOnChanges(changes: SimpleChanges) {
		if (!this.updatedItem) {
			return;
		}
		const filter = this.encounterItems.filter(x => x.originalItem._id === this.updatedItem._id);
		for (let i = 0; i < filter.length; i++) {
			const index = this.encounterItems.indexOf(filter[i]);
			if (this.updatedItem instanceof Monster) {
				const newPlayer: EncounterMonster = {
					originalItem: this.updatedItem,
					currentHitPoints: this.updatedItem.hitPoints,
					currentArmorClass: this.updatedItem.armorClass,
					played: false,
					initiative: null,
					visible: true
				};
				this.encounterItems.splice(index, 1, newPlayer);
			} else if (this.updatedItem instanceof Hero) {
				const newPlayer: EncounterHero = {
					originalItem: this.updatedItem,
					currentHitPoints: this.updatedItem.hitPoints,
					currentArmorClass: this.updatedItem.armorClass,
					played: false,
					initiative: null,
				};
				this.encounterItems.splice(index, 1, newPlayer);
			}
		}
	}

	removeItem(index) {
		this.encounterItems.splice(index, 1);
		this.onRemoveItem.emit();
	}

	startEncounter() {
		this.onStartEncounter.emit();
	}

	saveEncounter() {
		this.onSaveEncounter.emit();
	}
}
