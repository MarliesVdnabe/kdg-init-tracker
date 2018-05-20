import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../../../../api/models/hero';
import { PlayerType } from '../../../../api/enums/player-type';

@Component({
	selector: 'app-specs',
	templateUrl: './specs.component.html',
	styleUrls: ['./specs.component.scss']
})

export class SpecsComponent implements OnChanges {
	@Input() combatant: Hero;
	@Input() monsterOrHero: number;
	@Output() onSaveChanges: EventEmitter<Hero> = new EventEmitter<Hero>();

	combatantForm: FormGroup;

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
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.setFormData();
	}

	cancel() {
	}

	saveChanges() {
		const model = this.combatantForm.value;
		if (this.combatant) {
			const changedCombatant = this.combatant;
			this.combatant.name = model.Name;
			this.combatant.armorClass = model.Armorclass;
			this.combatant.hitPoints = model.Hitpoints;
			this.combatant.initModifier = model.Initiative;
			if (this.combatant.type === this.playerType.Hero) {
				this.combatant.player = model.player;
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
				newPlayer.type = model.player;
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
		}
	}
}
