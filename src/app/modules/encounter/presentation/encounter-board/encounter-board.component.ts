import { Component, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { EncounterHero } from '../../../../api/models/hero';
import { EncounterMonster } from '../../../../api/models/monster';

@Component({
	selector: 'app-encounter-board',
	templateUrl: 'encounter-board.component.html',
	styleUrls: ['./encounter-board.component.scss']
})

export class EncounterBoardComponent implements OnChanges {
	@Input() encounterStarted: boolean;
	@Input() encounterItems;
	@Output() onItemClicked: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		this.encounterItems.sort(this.sortAsc());
	}

	sortAsc() {
		return (a: EncounterHero | EncounterMonster, b: EncounterHero | EncounterMonster) => {
			if (a.initiative < b.initiative) {
				return 1;
			} else if (a.initiative > b.initiative) {
				return -1;
			} else {
				return 0;
			}
		};
	}

	showItemDetails(encounterItem) {
		this.onItemClicked.emit(encounterItem);
	}
}
