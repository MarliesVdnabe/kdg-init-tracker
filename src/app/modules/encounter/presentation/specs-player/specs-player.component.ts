import { Component, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
	@ViewChild('scale') scale: ElementRef;
	damageForm: FormGroup;

	constructor(
		private _fb: FormBuilder
	) {
		this.damageForm = this._fb.group({
			'Damage': ['', Validators.required]
		});
	}

	ngOnChanges() {
		this.setScale();
	}

	cancel() {
		this.onCancelClicked.emit();
	}

	saveDamage(damageOrHeal) {
		let value = this.damageForm.get('Damage').value;
		if (damageOrHeal === 'dam') {
			value = -value;
		}
		this.onSaveDamage.emit(value);
	}

	setScale() {
		const gradient = (this.activePlayer.currentHitPoints / this.activePlayer.originalItem.hitPoints) * 100;
		if (gradient >= 75 && gradient <= 100) {
			const styles = {
				'background': 'linear-gradient(90deg, #6bd765 100%, #FF6860 100%)'
			};
			return styles;
		} else if (gradient < 75 && gradient >= 50) {
			const styles = {
				'background': 'linear-gradient(90deg, #6bd765 65%, #FF6860 80%)'
			};
			return styles;
		} else if (gradient < 50 && gradient >= 25) {
			const styles = {
				'background': 'linear-gradient(90deg, #6bd765 35%, #FF6860 50%)'
			};
			return styles;
		} else if (gradient < 25 && gradient > 0) {
			const styles = {
				'background': 'linear-gradient(90deg, #6bd765 0%, #FF6860 15%)'
			};
			return styles;
		} else if (gradient <= 0) {
			const styles = {
				'background': 'linear-gradient(90deg, #6bd765 0%, #FF6860 0%)'
			};
			return styles;
		}
	}


}
