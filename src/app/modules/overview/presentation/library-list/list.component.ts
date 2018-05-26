import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Hero } from '../../../../api/models/hero';
import { CreatureTypeEnum } from '../../../../api/enums/creature-type';
import { Encounter } from '../../../../api/models/encounter';
import { Monster } from '../../../../api/models/monster';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnChanges {
	creatureTypeEnum = CreatureTypeEnum;
	filteredEncounters: Encounter[];

	searchForm: FormGroup;

	@Input() lastListClicked: number;
	@Input() items: Monster[] | Hero[] | Encounter[];
	@Output() onItemClicked: EventEmitter<Hero | Monster | Encounter> = new EventEmitter();
	@Output() onEditItemClicked: EventEmitter<Hero | Encounter> = new EventEmitter<Hero | Encounter>();
	@Output() onCreateNewClicked: EventEmitter<number> = new EventEmitter<number>();


	constructor(
		private _fb: FormBuilder
	) {
		this.searchForm = this._fb.group({
			'search': ['']
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.sortList(this.items);
	}

	addNewItem(monsterOrHero) {
		this.onCreateNewClicked.emit(monsterOrHero);
	}

	editItem(item) {
		this.onEditItemClicked.emit(item);
	}

	selectItem(item) {
		this.onItemClicked.emit(item);
	}

	showFiltered(items: any): any {
		const item = this.searchForm.get('search').value;
		if (items && item) {
			return items
				.filter(x => (x.name.toUpperCase().indexOf(item.toUpperCase())) > -1);
		} else {
			return items;
		}
	}

	/* SORT LIST ALPHABETICAL */
	sortList(list: any[]) {
		if (!list) {
			return;
		}
		return list.sort(this.sortListAsc());
	}

	private sortListAsc() {
		return (a: any, b: any) => {
			if (a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) {
				return -1;
			} else if (a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) {
				return 1;
			} else {
				return 0;
			}
		};
	}
}
