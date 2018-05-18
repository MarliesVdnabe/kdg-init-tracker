import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/* Components */
import { OverviewComponent } from './containers/overview/overview.component';
import { ListComponent } from './presentation/library-list/list.component';
import { InitiativeTableComponent } from './presentation/initiative-table/initiative-table.component';

/* Services */
import { OverviewService } from './services/overview.service';
import { SpecsComponent } from './presentation/specs/specs.component';

export const myOverviewRoutes = [
	{ path: '', component: OverviewComponent }
];

@NgModule({
	declarations: [
		OverviewComponent,
		ListComponent,
		InitiativeTableComponent,
		SpecsComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(myOverviewRoutes)
	],
	exports: [
		OverviewComponent,
		ListComponent,
		InitiativeTableComponent,
		SpecsComponent,
		ReactiveFormsModule
	],
	providers: [
		OverviewService
	],
})
export class OverviewModule { }
