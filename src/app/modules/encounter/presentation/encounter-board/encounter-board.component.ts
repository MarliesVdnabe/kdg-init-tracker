import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-encounter-board',
	templateUrl: 'encounter-board.component.html',
	styleUrls: ['./encounter-board.component.scss']
})

export class EncounterBoardComponent implements OnInit {
	@Input() combatants;

	constructor() { }

	ngOnInit() { }
}
