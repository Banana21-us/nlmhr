import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';

export const departmentsRoutes: Routes = [
    {path: 'create', component: CreateComponent},
    {path: 'update', component: UpdateComponent},
    {path: 'list', component: ListComponent},

    {path: '', redirectTo: 'list', pathMatch: 'full'}
    ];

    
