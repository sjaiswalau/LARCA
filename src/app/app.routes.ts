import { Routes } from '@angular/router';
import { MedicalmappingAddEditComponent } from './medicalmapping/medicalmapping-add-edit/medicalmapping-add-edit.component';
import { MedicalMappingListComponent } from './medicalmapping/medicalmapping-list/medicalmapping-list.component';

export const routes: Routes = [

    { path: '', redirectTo: 'app/medicalmapping/medicalmapping-list', pathMatch: 'full' },
    {
        path: 'app', children: [
            {
                path: 'medicalmapping', children: [
                    { path: 'medicalmapping-list', component: MedicalMappingListComponent },
                    { path: 'medicalmapping-add-edit', component: MedicalmappingAddEditComponent },
                    { path: 'medicalmapping-add-edit/:id', component: MedicalmappingAddEditComponent },
                ]
            },
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

