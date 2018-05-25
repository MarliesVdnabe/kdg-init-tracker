import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { EncounterHero } from '../../../../api/models/hero';
import { EncounterMonster } from '../../../../api/models/monster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-specs-player',
	templateUrl: './specs-player.component.html',
	styleUrls: ['./specs-player.component.scss']
})

export class SpecsPlayerComponent implements OnChanges {
	@Input() activePlayer: EncounterHero | EncounterMonster;
	@Input() disableInput: boolean;
	@Input() showDamage: boolean;
	@Output() onSaveDamage: EventEmitter<number> = new EventEmitter();
	@Output() onCancelClicked: EventEmitter<null> = new EventEmitter();
	damageForm: FormGroup;

	constructor(
		private _fb: FormBuilder
	) {
		this.damageForm = this._fb.group({
			'Damage': ['', Validators.required]
		});
	}

	ngOnChanges() {
	}

	saveDamage(damageOrHeal) {
		let value = this.damageForm.get('Damage').value;
		if (damageOrHeal === 'dam') {
			value = -value;
		}
		this.onSaveDamage.emit(value);
	}

	cancel() {
		this.onCancelClicked.emit();
	}
}
