import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Hero } from '../../../../api/models/hero';
import { Combatant } from '../../../../api/models/combatant';

@Component({
	selector: 'app-initiative-table',
	templateUrl: './initiative-table.component.html',
	styleUrls: ['./initiative-table.component.scss']
})

export class InitiativeTableComponent implements OnChanges {
	@Input() combatants;
	@Input() updatedPlayer: Hero;
	@Input() encountersList;
	@Output() onStartEncounter: EventEmitter<any> = new EventEmitter<any>();
	@Output() onSaveEncounter: EventEmitter<Hero[]> = new EventEmitter<Hero[]>();

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		if (!this.updatedPlayer) {
			return;
		}
		const filter = this.combatants.filter(x => x.player._id === this.updatedPlayer._id);
		for (let i = 0; i < filter.length; i++) {
			const index = this.combatants.indexOf(filter[i]);
			const newPlayer = i === 0 ? { player: this.updatedPlayer, tempId: null } : { player: this.updatedPlayer, tempId: i };
			this.combatants.splice(index, 1, newPlayer);
		}
	}

	removeCombatant(name, tempId) {
		const item = this.combatants.find(x => x.player.name === name && x.tempId === tempId);
		const index = this.combatants.indexOf(item);
		this.combatants.splice(index, 1);
	}

	startEncounter() {
		this.onStartEncounter.emit(this.combatants);
	}

	saveEncounter() {
		this.onSaveEncounter.emit(this.combatants);
	}
}
