import { NgModule } from '@angular/core';
import { EncounterComponent } from './containers/encounter/encounter.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EncounterResolver } from './resolver/encounter.resolver';

export const myEncounterRoutes = [
	{ path: '', component: EncounterComponent, resolve: { encounter: EncounterResolver } }
];

@NgModule({
	declarations: [
		EncounterComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(myEncounterRoutes)
	],
	exports: [
		EncounterComponent
	],
	providers: [
		EncounterResolver
	],
})
export class EncounterModule { }
