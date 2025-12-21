import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UsersComponent } from './modules/users/users.component';
import { EventsComponent } from './modules/events/events.component';
import { AboutComponent } from './modules/about/about.component';
import { AdminComponent } from './modules/admin/admin.component';

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
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];
