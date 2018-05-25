import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-roll-initiative',
	templateUrl: './roll-initiative.component.html',
	styleUrls: ['./roll-initiative.component.scss']
})

export class RollInitiativeComponent implements OnInit {
	@Input() encounterItems;
	@Output() onInitSaved: EventEmitter<null> = new EventEmitter();
	constructor() { }

	ngOnInit() {
	}

	saveInit() {
		this.onInitSaved.emit();
	}
}
