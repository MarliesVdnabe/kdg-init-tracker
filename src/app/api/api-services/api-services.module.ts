import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HeroApiService } from './hero.api.service';
import { MonsterApiService } from './monster.api.service';
import { EncounterApiService } from './encounter.api.service';

@NgModule({
	imports: [
		HttpClientModule,
		HttpModule
	]
})
export class ApiServicesModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ApiServicesModule,
			providers: [
				HeroApiService,
				MonsterApiService,
				EncounterApiService
			]
		};
	}
}

