import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss']
})

export class OverviewComponent implements OnInit {
	heroes: Hero[];
	monsters: Hero[];
	loaded: Boolean = false;
	list: string;

	constructor(
		private _overviewService: OverviewService
	) { }

	ngOnInit() {
		this.showMonsterList();
	}

	showMonsterList() {
		this._overviewService.getAllMonsters()
			.subscribe((monsters: RequestResult<any | RequestError>) => {
				if (monsters.requestResultType === RequestResultType.Data) {
					this.monsters = monsters.data as Hero[];
					this.heroes = undefined;
					this.loaded = true;
				}
			});
	}

	showHeroesList() {
		this._overviewService.getAllHeroes()
			.subscribe((heroes: RequestResult<any | RequestError>) => {
				if (heroes.requestResultType === RequestResultType.Data) {
					this.heroes = heroes.data as Hero[];
					this.monsters = undefined;
					this.loaded = true;
				}
			});
	}

	selectedItem(event) {
		console.log(event);
	}
}
