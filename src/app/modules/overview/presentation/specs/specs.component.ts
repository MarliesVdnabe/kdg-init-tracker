import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../../../../api/models/hero';
import { CreatureTypeEnum } from '../../../../api/enums/creature-type';
import { Encounter } from '../../../../api/models/encounter';
import { Monster } from '../../../../api/models/monster';

@Component({
	selector: 'app-specs',
	templateUrl: './specs.component.html',
	styleUrls: ['./specs.component.scss']
})

export class SpecsComponent implements OnChanges {
	formType: number;
	@Input() startEnounter;
	@Input() item: Hero | Monster | Encounter;
	@Input() createItem: number;
	@Output() onSaveItem: EventEmitter<Hero | Monster | Encounter> = new EventEmitter();
	@Output() onCancelClicked: EventEmitter<null> = new EventEmitter();

	heroForm: FormGroup;
	monsterForm: FormGroup;
	encounterForm: FormGroup;

	creatureTypeEnum = CreatureTypeEnum;

	constructor(
		private _fb: FormBuilder
	) {
		this.heroForm = _fb.group({
			'Name': ['', Validators.required],
			'Player': [''],
			'Hitpoints': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Armorclass': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Initiative': ['', Validators.compose([Validators.required, Validators.min(-1), Validators.max(10)])]
		});

		this.monsterForm = _fb.group({
			'Name': ['', Validators.required],
			'Hitpoints': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Armorclass': ['', Validators.compose([Validators.required, Validators.min(0)])],
			'Initiative': ['', Validators.compose([Validators.required, Validators.min(-1), Validators.max(10)])]
		});

		this.encounterForm = _fb.group({
			'Name': ['', Validators.required]
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.item instanceof Hero || this.createItem === this.creatureTypeEnum.Hero) {
			this.formType = 1;
		} else if (this.item instanceof Monster || this.createItem === this.creatureTypeEnum.Monster) {
			this.formType = 0;
		} else if (this.item instanceof Encounter || this.createItem === 2) {
			this.formType = 2;
		}
		this.setFormData();
	}

	cancel() {
		this.onCancelClicked.emit();
	}

	getFormData() {
		if (this.item instanceof Monster) {
			const model = this.monsterForm.value;
			this.item.name = model.Name;
			this.item.armorClass = model.Armorclass;
			this.item.hitPoints = model.Hitpoints;
			this.item.initModifier = model.Initiative;
		} else if (this.createItem === this.creatureTypeEnum.Monster) {
			const model = this.monsterForm.value;
			this.item = new Monster({
				name: model.Name,
				armorClass: model.Armorclass,
				hitPoints: model.Hitpoints,
				initModifier: model.Initiative,
				creatureType: 0
			});
		} else if (this.item instanceof Hero) {
			const model = this.heroForm.value;
			this.item.name = model.Name;
			this.item.player = model.Player;
			this.item.armorClass = model.Armorclass;
			this.item.hitPoints = model.Hitpoints;
			this.item.initModifier = model.Initiative;
		} else if (this.createItem === this.creatureTypeEnum.Hero) {
			const model = this.heroForm.value;
			this.item = new Hero({
				name: model.Name,
				player: model.Player,
				armorClass: model.Armorclass,
				hitPoints: model.Hitpoints,
				initModifier: model.Initiative,
				creatureType: 1
			});
		} else if (this.item instanceof Encounter) {
			const model = this.encounterForm.value;
			this.item.name = model.Name;
		} else {
			const model = this.encounterForm.value;
			this.item = new Encounter({
				name: model.Name,
				heroes: [],
				monsters: []
			});
		}
	}

	saveItem() {
		this.getFormData();
		this.onSaveItem.emit(this.item);
	}

	setFormData() {
		if (this.item instanceof Monster && this.item !== null) {
			this.monsterForm.get('Name').setValue(this.item.name);
			this.monsterForm.get('Hitpoints').setValue(this.item.hitPoints);
			this.monsterForm.get('Armorclass').setValue(this.item.armorClass);
			this.monsterForm.get('Initiative').setValue(this.item.initModifier);
		} else if (this.createItem === this.creatureTypeEnum.Monster) {
			this.monsterForm.get('Name').reset();
			this.monsterForm.get('Hitpoints').reset();
			this.monsterForm.get('Armorclass').reset();
			this.monsterForm.get('Initiative').reset();
		} else if (this.item instanceof Hero) {
			this.heroForm.get('Name').setValue(this.item.name);
			this.heroForm.get('Player').setValue(this.item.player);
			this.heroForm.get('Hitpoints').setValue(this.item.hitPoints);
			this.heroForm.get('Armorclass').setValue(this.item.armorClass);
			this.heroForm.get('Initiative').setValue(this.item.initModifier);
		} else if (this.createItem === this.creatureTypeEnum.Hero) {
			this.heroForm.get('Name').reset();
			this.heroForm.get('Player').reset();
			this.heroForm.get('Hitpoints').reset();
			this.heroForm.get('Armorclass').reset();
			this.heroForm.get('Initiative').reset();
		} else if (this.item instanceof Encounter) {
			this.encounterForm.get('Name').setValue(this.item.name);
		} else if (this.createItem === 2) {
			this.encounterForm.get('Name').reset();
		}
	}
}
