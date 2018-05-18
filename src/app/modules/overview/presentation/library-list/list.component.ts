import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
	@Input() heroes: Hero[];
	@Input() monsters: Hero[];
	@Output() onItemClicked: EventEmitter<any> = new EventEmitter<any>();
	@Output() onEditPlayerClicked: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }
	ngOnInit() { }

	editPlayer(monsterOrHero, id) {
		this.onEditPlayerClicked.emit({ item: monsterOrHero, id: id });
		console.log(monsterOrHero, id);
	}

	selectPlayer(monsterOrHero, details) {
		this.onItemClicked.emit({ item: monsterOrHero, details: details });
	}
}
