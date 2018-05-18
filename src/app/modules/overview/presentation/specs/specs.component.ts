import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../../../../api/models/hero';

@Component({
	selector: 'app-specs',
	templateUrl: './specs.component.html',
	styleUrls: ['./specs.component.scss']
})

export class SpecsComponent implements OnInit {
	@Input() combatant: Hero;
	combatantForm: FormGroup;
	constructor(
		private _fb: FormBuilder
	) {
		this.combatantForm = _fb.group({
			'Name': ['', Validators.required]
		});
	}

	ngOnInit() {
		this.setFormData();
	}

	setFormData() {
		if (this.combatant) {
			this.combatantForm.get('Name').setValue(this.combatant.name);
		}

	}
}
