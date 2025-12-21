import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PatientsComponent } from './modules/patients/patients.component';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { AboutComponent } from './modules/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'patients',
        component: PatientsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];
