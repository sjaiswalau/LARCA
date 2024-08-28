import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule as AngularCommonModule } from '@angular/common';

import { CasePayControlComponent } from './casepaycontrol.component';
import { CasePayControlRoutingModule } from './casepaycontrol-routing.module';
import { CommonModule } from '../common/common.module';
import ProviderService from '../shared/api/provider.service';
import CasePayControlService from '../shared/api/casepaycontrol.service';
import { MoveNextByMaxLengthDirectiveModule } from '../common/directives/movenextbymaxlength.directive';


@NgModule({
  declarations: [CasePayControlComponent ],
  imports: [
    CasePayControlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MoveNextByMaxLengthDirectiveModule
  ],
  providers: [ProviderService,
              CasePayControlService]

})
export class CasePayControlModule { }
