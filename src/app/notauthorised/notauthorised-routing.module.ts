import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotAuthorisedComponent } from './notauthorised.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: NotAuthorisedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthorisedRoutingModule { }
