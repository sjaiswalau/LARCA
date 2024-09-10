import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, } from '@angular/common/http';
import { ConfigService } from './core/config.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideAnimations(),
  provideHttpClient(withInterceptorsFromDi()),
  {
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () => configService.loadConfig(),
    deps: [ConfigService],
    multi: true
  },
  provideRouter(routes)]
};
