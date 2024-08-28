import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule as AngularCommonModule } from '@angular/common';

import { CasePayDefinitionComponent } from './casepaydefinition.component';
import { CasePayDefinitionRoutingModule } from './casepaydefinition-routing.module';
import { CommonModule } from '../common/common.module';
import ProviderService from '../shared/api/provider.service';
import CasePayDefinitionService from '../shared/api/casepaydefinition.service';
import { MoveNextByMaxLengthDirectiveModule } from '../common/directives/movenextbymaxlength.directive';

@NgModule({
  declarations: [CasePayDefinitionComponent],
  imports: [
    CasePayDefinitionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MoveNextByMaxLengthDirectiveModule
  ],
  providers: [ProviderService,
              CasePayDefinitionService]

})
export class CasePayDefinitionModule { }
