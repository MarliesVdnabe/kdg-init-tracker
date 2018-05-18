import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-initiative-table',
	templateUrl: './initiative-table.component.html',
	styleUrls: ['./initiative-table.component.scss']
})

export class InitiativeTableComponent implements OnInit {
	@Input() combatants;
	@Output() onStartEncounter: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() { }

	// editCombatant(id, type) {
	// 	this.onEditCombatant.emit({ id: id, type: type });
	// 	console.log(id, type);
	// }

	removeCombatant(name, tempId) {
		const item = this.combatants.find(x => x.details.name === name && x.tempId === tempId);
		const index = this.combatants.indexOf(item);
		this.combatants.splice(index, 1);
	}

	startEncounter() {
		this.onStartEncounter.emit(this.combatants);
	}
}
