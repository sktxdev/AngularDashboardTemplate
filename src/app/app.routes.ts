import { Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { EventsComponent } from './features/events/events.component';
import { AboutComponent } from './features/about/about.component';
import { AdminComponent } from './features/admin/admin.component';
import { SettingsComponent } from './features/settings/settings.component';
import { RolesComponent } from './features/admin/roles/roles.component';
import { PermissionsComponent } from './features/admin/permissions/permissions.component';
import { ContactComponent } from './features/about/contact/contact.component';
import { SoftwareComponent } from './features/about/software/software.component';

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
        path: 'admin/settings',
        component: SettingsComponent
      },
      {
        path: 'admin/roles',
        component: RolesComponent
      },
      {
        path: 'admin/permissions',
        component: PermissionsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'about/contact',
        component: ContactComponent
      },
      {
        path: 'about/software',
        component: SoftwareComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];
