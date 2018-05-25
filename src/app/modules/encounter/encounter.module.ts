import { NgModule } from '@angular/core';
import { EncounterComponent } from './containers/encounter/encounter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EncounterResolver } from './resolver/encounter.resolver';
import { EncounterBoardComponent } from './presentation/encounter-board/encounter-board.component';
import { RollInitiativeComponent } from './presentation/roll-initiative/roll-initiative.component';
import { EncounterService } from './services/encounter.service';
import { NavigationButtonsComponent } from './presentation/navigation-buttons/navigation-buttons.component';
import { SpecsPlayerComponent } from './presentation/specs-player/specs-player.component';

export const myEncounterRoutes = [
	{ path: '', component: EncounterComponent, resolve: { encounter: EncounterResolver } }
];

@NgModule({
	declarations: [
		EncounterComponent,
		EncounterBoardComponent,
		RollInitiativeComponent,
		NavigationButtonsComponent,
		SpecsPlayerComponent
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild(myEncounterRoutes),
	],
	exports: [
		EncounterComponent,
		EncounterBoardComponent,
		RollInitiativeComponent,
		NavigationButtonsComponent,
		SpecsPlayerComponent
	],
	providers: [
		EncounterService,
		EncounterResolver
	],
})
export class EncounterModule { }
