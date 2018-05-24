import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../../services/overview.service';
import { RequestResult } from '../../../../api/models/request-result';
import { RequestError } from '../../../../api/models/request-error';
import { RequestResultType } from '../../../../api/enums/request-result-type';
import { Hero } from '../../../../api/models/hero';
import { PlayerType } from '../../../../api/enums/player-type';
import { Encounter } from '../../../../api/models/encounter';
import { Combatant } from '../../../../api/models/combatant';
import { Router } from '@angular/router/';

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
	encounter: Encounter;
	encounters: Encounter[];
	combatantsList = [];
	encounterId: string;
	newEncounterId: string;

	// Enums
	playertype = PlayerType;

	// STATE
	monsterOrHeroloaded: Boolean = false;
	encounterLoaded: Boolean = false;
	enableCombatant: Boolean = false;
	reload: Boolean = false;
	createNewMonsterOrHero: Boolean = false;
	createNewEncounter: Boolean = false;
	enableEncounter: Boolean = false;

	constructor(
		private _overviewService: OverviewService,
		private _router: Router,
	) { }

	ngOnInit() {
		this.showMonsterOrHeroesList(0);
	}

	addEncounterToInitiative(encounter) {
		this.encounterId = encounter._id;
		this.combatants = [];
		let combatant;
		for (let i = 0; i < encounter.combatants.length; i++) {
			this._overviewService.getCombatant(encounter.combatants[i])
				.subscribe((combatnt: RequestResult<any | RequestError>) => {
					if (combatnt.requestResultType === RequestResultType.Data) {
						const cmb = combatnt.data as Combatant;
						if (cmb.type === this.playertype.Monster) {
							this._overviewService.getMonster(cmb.combatant[0])
								.subscribe((monstr: RequestResult<any | RequestError>) => {
									if (monstr.requestResultType === RequestResultType.Data) {
										const monster = monstr.data as Hero;
										combatant = { player: monster, tempId: null };
										this.combatants.push(combatant);
									} else {
										console.log(monstr.data as RequestError);
									}
								});
						} else {
							this._overviewService.getHero(cmb.combatant[0])
								.subscribe((her: RequestResult<any | RequestError>) => {
									if (her.requestResultType === RequestResultType.Data) {
										const hero = her.data as Hero;
										combatant = { player: hero, tempId: null };
										this.combatants.push(combatant);
									}
								});
						}
					} else {
						console.log(combatnt.data as RequestError);
					}
				});
		}
	}

	addPlayerToInitiative(player) {
		this.encounterId = undefined;
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

	cancel() {
		this.createNewMonsterOrHero = false;
		this.createNewEncounter = false;
		this.enableCombatant = false;
		this.enableEncounter = false;
	}

	createEncounter(encounter) {
		this._overviewService.createNewEncounter(encounter)
			.subscribe((enc: RequestResult<any | RequestError>) => {
				if (enc.requestResultType === RequestResultType.Data) {
					console.log(enc.data);
					const data = enc.data;
					this.newEncounterId = data._id;
				} else {
					console.log(enc.data as RequestError);
				}
			});
	}

	createNewPlayer(monsterOrHero) {
		console.log(monsterOrHero);
		this.createNewMonsterOrHero = true;
		this.enableCombatant = false;
		this.enableEncounter = false;
		this.createNewEncounter = false;
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

	saveCombatantsToEncounter(combatants) {
		this.savePlayerToCombatant(combatants);
		setTimeout(() => {
			this.createNewEncounter = true;
			this.createNewMonsterOrHero = false;
			this.enableCombatant = false;
			this.enableEncounter = false;
		}, 200);
	}

	saveEncounter(encounter: Encounter) {
		this._overviewService.saveEncounter(encounter)
			.subscribe((savedEncounter: RequestResult<any | RequestError>) => {
				if (savedEncounter.requestResultType === RequestResultType.Data) {
					this.createNewEncounter = false;
				} else {
					console.log(savedEncounter.data as RequestError);
				}
			});
	}

	savePlayer(player: Hero) {
		this._overviewService.createNewPlayer(player)
			.subscribe((newPlayer: RequestResult<any | RequestError>) => {
				if (newPlayer.requestResultType === RequestResultType.Data) {
					this.showMonsterOrHeroesList(this.lastListClicked);
				} else {
					console.log(newPlayer.data as RequestError);
				}
			});
	}

	savePlayerToCombatant(combatants): void {
		let combatnt;
		for (let i = 0; i < combatants.length; i++) {
			combatnt = {
				combatant: combatants[i].player, type: combatants[i].player.type, initiative: 0, played: false,
				currentHitPoints: combatants[i].player.hitPoints
			};
			this._overviewService.createNewCombatants(combatnt)
				.subscribe(combatant => {
					if (combatant.requestResultType === RequestResultType.Data) {
						const data = combatant.data;
						this.combatantsList.push(data._id);
					} else {
						console.log(combatant as RequestError);
					}
				});
		}
	}

	showEncountersList() {
		this._overviewService.getAllEncounters()
			.subscribe((encounters: RequestResult<any | RequestError>) => {
				if (encounters.requestResultType === RequestResultType.Data) {
					this.encounters = encounters.data;
					this.monsterOrHeroloaded = false;
					this.encounterLoaded = true;
				} else {
					console.log(encounters.data as RequestError);
				}
			});
	}

	showMonsterOrHeroesList(monsterOrHero: number) {
		this.lastListClicked = monsterOrHero;
		this._overviewService.getAllMonstersOrHeroes(monsterOrHero)
			.subscribe((players: RequestResult<any | RequestError>) => {
				if (players.requestResultType === RequestResultType.Data) {
					this.players = players.data as Hero[];
					this.encounterLoaded = false;
					this.monsterOrHeroloaded = true;
				} else {
					console.log(players.data as RequestError);
				}
			});
	}

	startEncounter(combatantsOrString) {
		if (combatantsOrString instanceof Array) {
			this.savePlayerToCombatant(combatantsOrString);
			setTimeout(() => {
				const newEncounter = new Encounter();
				newEncounter.combatants = this.combatantsList;
				newEncounter.name = null;
				this.createEncounter(newEncounter);
				setTimeout(() => {
					this._router.navigate(['/encounter', this.newEncounterId]);
				}, 200);
			}, 200);

		} else {
			this._router.navigate(['/encounter/', combatantsOrString]);
		}
	}

	viewCombatant(player) {
		this.createNewMonsterOrHero = false;
		this.createNewEncounter = false;
		this.enableEncounter = false;
		this._overviewService.getMonsterOrHero(player)
			.subscribe((viewPlayer: RequestResult<any | RequestError>) => {
				if (viewPlayer.requestResultType === RequestResultType.Data) {
					this.combatant = viewPlayer.data as Hero;
					this.enableCombatant = true;
				}
			});
	}

	viewEncounter(encounter) {
		this.createNewMonsterOrHero = false;
		this.createNewEncounter = false;
		this.enableCombatant = false;
		this.enableEncounter = true;
		this.encounter = encounter;
	}
}
