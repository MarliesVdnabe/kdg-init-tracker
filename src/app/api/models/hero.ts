export class Hero {
	name: string;
	player?: string;
	hitPoints: number;
	armorClass: number;
	initModifier: number;

	constructor(json: any) {
		this.name = json.name;
		this.player = json.player;
		this.hitPoints = json.hitPoints;
		this.armorClass = json.armorClass;
		this.initModifier = json.initModifier;
	}
}
