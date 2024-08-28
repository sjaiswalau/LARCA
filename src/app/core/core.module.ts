import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfigService } from './config.service';

export let AppInjector: Injector;

export function setAppInjector(injector: Injector) {
  if (AppInjector) {
    // Should not happen
    console.error('Programming error: AppInjector was already set');
  } else {
    AppInjector = injector;
  }
}

const APP_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () => configService.loadConfig(),
    deps: [ConfigService],
    multi: true
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, injector: Injector) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
    setAppInjector(injector);
  }


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        APP_PROVIDERS,
        ConfigService
      ]
    };
  }
}
