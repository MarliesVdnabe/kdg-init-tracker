import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-encounter',
	templateUrl: 'encounter.component.html'
})

export class EncounterComponent implements OnInit {
	snapshot;
	constructor(
		private _route: ActivatedRoute
	) {
		this.snapshot = this._route.snapshot;
	}

	ngOnInit() {
		console.log(this.snapshot.data.encounter.data);
	}
}
