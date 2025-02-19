import { CanActivateFn, Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardComponent } from './Modules/Dashboard/dashboard.component';
import { EmployeeRoutes } from './Modules/Employees/employee.routes';
import { announcementRoutes } from './Modules/Announcements/announement.routes';
import { departmentsRoutes } from './Modules/Departments/dapartmets.routes';
import { LeaveManagementRoutes } from './Modules/LeaveManagement/leavemanagement.routes';
import { LeaveRequest } from './Modules/LeaveRequest/leaverequest.routes';
import { inject } from '@angular/core';
import { AccountComponent } from './Modules/Account/account.component';

export const loginGuard: CanActivateFn = (route,state)=>{
  const localData = localStorage.getItem('token');
  if(localData != null){
    inject(Router).navigateByUrl('/main-page');
    return false;
  }
  return true;
}

export const routes: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[loginGuard] 
      },
      
    { path: 'main-page', component: MainPageComponent ,
      children: [
        { path: 'Dashboard',component: DashboardComponent 
        },
        { path: 'Account',component: AccountComponent 
        },
        { path: 'Employee', 
          loadChildren: () => import('./Modules/Employees/employee.routes').then(r => EmployeeRoutes),
        },
        { path: 'Announcement', 
          loadChildren: () => import('./Modules/Announcements/announement.routes').then(r => announcementRoutes),
        },
        { path: 'Departments', 
          loadChildren: () => import('./Modules/Departments/dapartmets.routes').then(r => departmentsRoutes),
        },
        { path: 'LeaveManagement', 
          loadChildren: () => import('./Modules/LeaveManagement/leavemanagement.routes').then(r => LeaveManagementRoutes),
        },
        { path: 'LeaveRequest', 
          loadChildren: () => import('./Modules/LeaveRequest/leaverequest.routes').then(r => LeaveRequest),
        },
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }
      ]
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
