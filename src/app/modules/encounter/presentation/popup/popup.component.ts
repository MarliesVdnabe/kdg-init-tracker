import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
	@Output() onDelete: EventEmitter<string> = new EventEmitter();
	constructor() { }

	ngOnInit() { }

	delete(yOrN) {
		this.onDelete.emit(yOrN);
	}
}
