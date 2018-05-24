import { Component, OnInit, Input } from '@angular/core';
import { Combatant } from '../../../../api/models/combatant';

@Component({
	selector: 'app-encounter-board',
	templateUrl: 'encounter-board.component.html',
	styleUrls: ['./encounter-board.component.scss']
})

export class EncounterBoardComponent implements OnInit {
	@Input() combatants: Combatant[];

	constructor() { }

	ngOnInit() { }
}
