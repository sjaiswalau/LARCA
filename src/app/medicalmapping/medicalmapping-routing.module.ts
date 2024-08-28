import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalMappingComponent } from './medicalmapping.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MedicalMappingComponent },
  { path: 'medicalmapping', pathMatch: 'full', component: MedicalMappingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalMappingRoutingModule { }
