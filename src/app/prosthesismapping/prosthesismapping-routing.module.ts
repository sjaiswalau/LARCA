import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProsthesisMappingComponent } from './prosthesismapping.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProsthesisMappingComponent },
  { path: 'prosthesismapping', pathMatch: 'full', component: ProsthesisMappingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProsthesisMappingRoutingModule { }
