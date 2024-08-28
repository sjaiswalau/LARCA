import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { ProsthesisMappingComponent } from './prosthesismapping.component';
import { ProsthesisMappingRoutingModule } from './prosthesismapping-routing.module';
import ProsthesisMappingService from '../shared/api/prosthesismapping.service';
import { CommonModule } from '../common/common.module';
import { MoveNextByMaxLengthDirectiveModule } from '../common/directives/movenextbymaxlength.directive';


@NgModule({
  declarations: [ProsthesisMappingComponent],
  imports: [
    ProsthesisMappingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MoveNextByMaxLengthDirectiveModule
  ],
  providers: [ProsthesisMappingService]

})
export class ProsthesisMappingModule { }
