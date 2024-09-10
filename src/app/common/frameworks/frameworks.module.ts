import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FrameworksModule { }
