import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { OverviewComponent } from './containers/overview/overview.component';
import { ListComponent } from './presentation/list/list.component';
import { RouterModule } from '@angular/router';

/* Services */
import { OverviewService } from './services/overview.service';

export const myOverviewRoutes = [
	{ path: '', component: OverviewComponent }
];

@NgModule({
	declarations: [
		OverviewComponent,
		ListComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(myOverviewRoutes)
	],
	exports: [
		OverviewComponent,
		ListComponent
	],
	providers: [
		OverviewService
	],
})
export class OverviewModule { }
