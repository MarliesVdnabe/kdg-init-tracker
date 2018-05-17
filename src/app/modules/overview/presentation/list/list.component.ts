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

	constructor() { }
	ngOnInit() { }

	selectPlayer(monsterOrHero, id) {
		this.onItemClicked.emit({ item: monsterOrHero, id: id });
	}
}
