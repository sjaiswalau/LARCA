import { NgModule } from '@angular/core';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Add bootstrap modules as required

@NgModule({
  declarations: [],
  imports: [
    NgbTooltipModule,
    NgbModule
  ],
  exports: [
    NgbTooltipModule,
    NgbModule
  ]
})
export class BootstrapModule { }
