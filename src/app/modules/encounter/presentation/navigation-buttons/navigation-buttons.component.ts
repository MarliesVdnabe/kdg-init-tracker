import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-navigation-buttons',
	templateUrl: './navigation-buttons.component.html',
	styleUrls: ['./navigation-buttons.component.scss']
})

export class NavigationButtonsComponent implements OnInit {
	started: boolean;
	@Output() onActionButtonClicked: EventEmitter<string> = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	buttonClicked(action: string) {
		this.onActionButtonClicked.emit(action);
		this.started = true;
		if (action === 'stop') {
			this.started = false;
		}
	}
}
