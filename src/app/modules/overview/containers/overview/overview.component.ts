import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { Hero } from '../../../../api/models/hero';
import { PlayerType } from '../../../../api/enums/player-type';

@Component({
	selector: 'app-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss']
})

export class OverviewComponent implements OnInit {
	players: Hero[];
	combatant: Hero;
	combatants = [];
	list: string;
	lastListClicked: number;
	updatedPlayer: Hero = null;
	monsterOrHero: number;

	// Enums
	playertype = PlayerType;

	// STATE
	loaded: Boolean = false;
	enableCombatant: Boolean = false;
	reload: Boolean = false;
	createNewMonsterOrHero: Boolean = false;

	constructor(
		private _overviewService: OverviewService
	) { }

	ngOnInit() {
		this.showMonsterOrHeroesList(0);
	}

	addPlayerToInitiative(player) {
		const combatant = { player: player, tempId: null };
		// SEE IF COMBATANT IS ALREADY IN LIST AND ADD TEMPID
		for (let i = 0; i < this.combatants.length; i++) {
			if (this.combatants[i].player.name === combatant.player.name && !this.combatants[i].tempId) {
				combatant.tempId = 2;
			} else if (this.combatants[i].player.name === combatant.player.name && this.combatants[i].tempId) {
				combatant.tempId = this.combatants[i].tempId + 1;
			}
		}
		this.combatants.push(combatant);
	}

	createNewPlayer(monsterOrHero) {
		this.createNewMonsterOrHero = true;
		this.enableCombatant = false;
		this.monsterOrHero = monsterOrHero;
	}

	editPlayer(player) {
		this._overviewService.updateMonsterOrHero(player)
			.subscribe((updatedPlayer: RequestResult<any | RequestError>) => {
				if (updatedPlayer.requestResultType === RequestResultType.Data) {
					this.showMonsterOrHeroesList(this.lastListClicked);
					this.updatedPlayer = updatedPlayer.data;
					this.enableCombatant = false;
				} else {
					console.log(updatedPlayer.data as RequestError);
				}
			});
	}

	savePlayer(player: Hero) {
		console.log(player);
		this._overviewService.createNewPlayer(player)
			.subscribe((newPlayer: RequestResult<any | RequestError>) => {
				if (newPlayer.requestResultType === RequestResultType.Data) {
					this.showMonsterOrHeroesList(this.lastListClicked);
				} else {
					console.log(newPlayer.data as RequestError);
				}
			});
	}

	showMonsterOrHeroesList(monsterOrHero: number) {
		this.lastListClicked = monsterOrHero;
		this._overviewService.getAllMonstersOrHeroes(monsterOrHero)
			.subscribe((players: RequestResult<any | RequestError>) => {
				if (players.requestResultType === RequestResultType.Data) {
					this.players = players.data as Hero[];
					this.loaded = true;
				} else {
					console.log(players.data as RequestError);
				}
			});
	}

	startEncounter(event) {
		console.log(event);
	}

	viewCombatant(player) {
		this.createNewMonsterOrHero = false;
		this._overviewService.getMonsterOrHero(player)
			.subscribe((viewPlayer: RequestResult<any | RequestError>) => {
				if (viewPlayer.requestResultType === RequestResultType.Data) {
					this.combatant = viewPlayer.data as Hero;
					this.enableCombatant = true;
				}
			});
	}
}
