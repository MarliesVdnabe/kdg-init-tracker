import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewModule } from './modules/overview/overview.module';
import { EncounterModule } from './modules/encounter/encounter.module';
import { DomainServicesModule } from './api/domain-services/domain-services.module';

const appRoutes: Routes = [
	{ path: 'overview', loadChildren: './modules/overview/overview.module#OverviewModule' },
	{ path: '', redirectTo: 'overview', pathMatch: 'full' },
	{ path: 'encounter/:id', loadChildren: './modules/encounter/encounter.module#EncounterModule' }
];

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes, {}),
		DomainServicesModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
