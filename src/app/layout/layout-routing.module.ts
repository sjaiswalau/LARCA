import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'casepaydefinition', pathMatch: 'full' },
      { path: 'notauthorised', loadChildren: () => import('../notauthorised/notauthorised.module').then(m => m.NotAuthorisedModule) },
      // tslint:disable-next-line: max-line-length
      { path: 'casepaydefinition', loadChildren: () => import('../casepaydefinition/casepaydefinition.module').then(m => m.CasePayDefinitionModule) },
      { path: 'casepaycontrol', loadChildren: () => import('../casepaycontrol/casepaycontrol.module').then(m => m.CasePayControlModule) },
      { path: 'medicalmapping', loadChildren: () => import('../medicalmapping/medicalmapping.module').then(m => m.MedicalMappingModule) },
      { path: 'prosthesismapping', loadChildren: () => import('../prosthesismapping/prosthesismapping.module').then(m => m.ProsthesisMappingModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
