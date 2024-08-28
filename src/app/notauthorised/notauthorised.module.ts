import { NgModule } from '@angular/core';

import { NotAuthorisedComponent } from './notauthorised.component';
import { NotAuthorisedRoutingModule } from './notauthorised-routing.module';

@NgModule({
  declarations: [NotAuthorisedComponent],
  imports: [
    NotAuthorisedRoutingModule,
  ]
})
export class NotAuthorisedModule { }
