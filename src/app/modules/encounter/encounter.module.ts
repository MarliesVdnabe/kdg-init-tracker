import { NgModule } from '@angular/core';
import { EncounterComponent } from './containers/encounter/encounter.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EncounterResolver } from './resolver/encounter.resolver';
import { EncounterBoardComponent } from './presentation/encounter-board/encounter-board.component';

export const myEncounterRoutes = [
	{ path: '', component: EncounterComponent, resolve: { encounter: EncounterResolver } }
];

@NgModule({
	declarations: [
		EncounterComponent,
		EncounterBoardComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(myEncounterRoutes)
	],
	exports: [
		EncounterComponent,
		EncounterBoardComponent
	],
	providers: [
		EncounterResolver
	],
})
export class EncounterModule { }
