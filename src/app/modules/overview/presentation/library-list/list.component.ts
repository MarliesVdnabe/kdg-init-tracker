import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Hero } from '../../../../api/models/hero';
import { PlayerType } from '../../../../api/enums/player-type';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnChanges {
	playerType = PlayerType;

	@Input() players: Hero[];
	@Output() onPlayerClicked: EventEmitter<Hero> = new EventEmitter<Hero>();
	@Output() onEditPlayerClicked: EventEmitter<Hero> = new EventEmitter<Hero>();
	@Output() onAddPlayerClicked: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		this.sortList(this.players);
	}

	addNewplayer(monsterOrHero) {
		this.onAddPlayerClicked.emit(monsterOrHero);
	}

	editPlayer(player) {
		this.onEditPlayerClicked.emit(player);
	}

	selectPlayer(player) {
		this.onPlayerClicked.emit(player);
	}

	// SORT LIST ALPHABETICAL
	sortList(list: Hero[]) {
		if (!list) {
			return;
		}
		return list.sort(this.sortListAsc());
	}

	private sortListAsc() {
		return (a: Hero, b: Hero) => {
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
