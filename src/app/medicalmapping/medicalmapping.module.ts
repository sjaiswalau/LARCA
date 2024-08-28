import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule as AngularCommonModule } from '@angular/common';

import { MedicalMappingComponent } from './medicalmapping.component';
import { MedicalMappingRoutingModule } from './medicalmapping-routing.module';
import { CommonModule } from '../common/common.module';
import MedicalMappingService from '../shared/api/medicalmapping.service';
import { MoveNextByMaxLengthDirectiveModule } from '../common/directives/movenextbymaxlength.directive';

@NgModule({
  declarations: [MedicalMappingComponent],
  imports: [
    MedicalMappingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MoveNextByMaxLengthDirectiveModule
  ],
  providers: [MedicalMappingService]

})
export class MedicalMappingModule { }
