import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';

import { FrameworksModule } from './frameworks/frameworks.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [],
  imports: [
    FrameworksModule,
    AngularCommonModule,
    NgbModule
  ],
  exports: [
    FrameworksModule,
    AngularCommonModule,
    NgbModule
  ]
})
export class CommonModule { }
