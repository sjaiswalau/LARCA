import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import AuthenticationService from '../shared/api/authentication.service';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    NgbModule
  ],
  providers: [AuthenticationService]
})
export class LayoutModule { }
