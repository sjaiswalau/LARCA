import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasePayControlComponent } from './casepaycontrol.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CasePayControlComponent },
  { path: 'casepaydefinition', pathMatch: 'full', component: CasePayControlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasePayControlRoutingModule { }
