import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasePayDefinitionComponent } from './casepaydefinition.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CasePayDefinitionComponent },
  { path: 'casepaydefinition', pathMatch: 'full', component: CasePayDefinitionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasePayDefinitionRoutingModule { }
