import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../../../../api/models/hero';
import { PlayerType } from '../../../../api/enums/player-type';
import { Encounter } from '../../../../api/models/encounter';
import { Combatant } from '../../../../api/models/combatant';

@Component({
	selector: 'app-specs',
	templateUrl: './specs.component.html',
	styleUrls: ['./specs.component.scss']
})

export class SpecsComponent implements OnChanges {
	@Input() combatant: Hero;
	@Input() monsterOrHero: number;
	@Input() encounter: Encounter;
	@Input() combatantsList: Combatant[];
	@Output() onSaveChanges: EventEmitter<Hero> = new EventEmitter<Hero>();
	@Output() onSaveEncounter: EventEmitter<Encounter> = new EventEmitter<Encounter>();
	@Output() onCancelClicked: EventEmitter<null> = new EventEmitter();

	combatantForm: FormGroup;
	encounterForm: FormGroup;

	// Enums
	playerType = PlayerType;

	constructor(
		private _fb: FormBuilder
	) {
		this.combatantForm = _fb.group({
			'Name': ['', Validators.required],
			'Player': [''],
			'Hitpoints': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Armorclass': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Initiative': ['', Validators.compose([Validators.required, Validators.min(-1), Validators.max(10)])]
		});

		this.encounterForm = _fb.group({
			'EncounterName': ['', Validators.required]
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.setFormData();
	}

	cancel() {
		this.onCancelClicked.emit();
	}

	saveEncounter() {
		const model = this.encounterForm.value;
		const encounter = new Encounter();
		if (this.combatantsList) {
			encounter.name = model.EncounterName;
			encounter.combatants = this.combatantsList;
			this.onSaveEncounter.emit(encounter);
		} else {
			this.encounter.name = model.EncounterName;
			this.onSaveEncounter.emit(this.encounter);
		}
	}

	saveChanges() {
		const model = this.combatantForm.value;
		if (this.combatant) {
			this.combatant.name = model.Name;
			this.combatant.armorClass = model.Armorclass;
			this.combatant.hitPoints = model.Hitpoints;
			this.combatant.initModifier = model.Initiative;
			this.combatant.type = this.monsterOrHero;
			if (this.combatant.type === this.playerType.Hero) {
				this.combatant.player = model.Player;
			}
			this.onSaveChanges.emit(this.combatant);
		} else {
			const newPlayer = new Hero();
			newPlayer.name = model.Name;
			newPlayer.armorClass = model.Armorclass;
			newPlayer.hitPoints = model.Hitpoints;
			newPlayer.initModifier = model.Initiative;
			newPlayer.type = this.monsterOrHero;
			if (this.monsterOrHero === this.playerType.Hero) {
				newPlayer.player = model.Player;
			}
			this.onSaveChanges.emit(newPlayer);
		}

	}

	setFormData() {
		if (this.combatant) {
			this.combatantForm.get('Name').setValue(this.combatant.name);
			this.combatantForm.get('Hitpoints').setValue(this.combatant.hitPoints);
			this.combatantForm.get('Armorclass').setValue(this.combatant.armorClass);
			this.combatantForm.get('Initiative').setValue(this.combatant.initModifier);
			if (this.combatant.type === this.playerType.Hero) {
				this.combatantForm.get('Player').setValue(this.combatant.player);
			}
		} else if (this.encounter) {
			this.encounterForm.get('EncounterName').setValue(this.encounter.name);
		}
	}
}
