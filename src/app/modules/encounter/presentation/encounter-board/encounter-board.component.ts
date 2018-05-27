import { Component, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { EncounterHero } from '../../../../api/models/hero';
import { EncounterMonster } from '../../../../api/models/monster';

@Component({
	selector: 'app-encounter-board',
	templateUrl: 'encounter-board.component.html',
	styleUrls: ['./encounter-board.component.scss']
})

export class EncounterBoardComponent implements OnChanges {
	selected = false;
	showPopup = false;
	removeItemIndex: number;
	@Input() encounterStarted: boolean;
	@Input() encounterItems;
	@Output() onItemClicked: EventEmitter<any> = new EventEmitter();
	@Output() onRemoveItem: EventEmitter<number> = new EventEmitter();


	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		console.log(this.encounterItems);
		this.encounterItems.sort(this.sortAsc());
	}

	confirmDelete(yOrN) {
		this.showPopup = false;
		if (yOrN === 'y') {
			this.onRemoveItem.emit(this.removeItemIndex);
		}
	}

	removeCombatant(index) {
		this.removeItemIndex = index;
		this.showPopup = true;
	}

	showItemDetails(event, encounterItem) {
		const r = event.target;
		if (r.className === 'hasEvent' || r.localName === 'img' || r.localName === 'label' || r.localName === 'span' || r.localName === 'input') {
			return;
		}
		this.encounterItems.forEach(e => {
			e.selected = false;
		});
		encounterItem.selected = true;
		this.onItemClicked.emit(encounterItem);
	}

	sortAsc() {
		return (a: EncounterHero | EncounterMonster, b: EncounterHero | EncounterMonster) => {
			if (a.initiative < b.initiative) {
				return 1;
			} else if (a.initiative > b.initiative) {
				return -1;
			} else {
				if (a.originalItem.initModifier < b.originalItem.initModifier) {
					return 1;
				} else if (a.originalItem.initModifier > b.originalItem.initModifier) {
					return -1;
				} else {
					return 0;
				}
			}
		};
	}
}
