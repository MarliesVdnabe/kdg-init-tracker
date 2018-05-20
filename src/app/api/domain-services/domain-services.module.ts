import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiServicesModule } from '../api-services/api-services.module';
import { HeroDomainService } from './hero.domain.service';
import { MonsterDomainService } from './monster.domain.service';
import { EncounterDomainService } from './encounter.domain.service';
import { CombatantDomainService } from './combatant.domain.service';

@NgModule({
	imports: [ApiServicesModule.forRoot()]
})
export class DomainServicesModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DomainServicesModule,
			providers: [
				HeroDomainService,
				MonsterDomainService,
				EncounterDomainService,
				CombatantDomainService
			]
		};
	}
}
