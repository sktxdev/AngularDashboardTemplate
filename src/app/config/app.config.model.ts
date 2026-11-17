/**
 * Configuration model for the dashboard template.
 * Edit `app.config.overrides.ts` to customize these values for your project.
 */

export interface MenuItem {
  icon: string;
  label: string;
  route: string;
  children?: MenuItem[];
}

export interface AppConfig {
  appName: string;
  appTitle: string;
  author: string;
  defaultTheme: 'light' | 'dark' | 'dracula';
  localStorageNamespace: string;
  sidebarHeader: string;
  databaseName: string;
  electronAppId: string;
  electronProductName: string;
  menuItems: MenuItem[];
}

export const DEFAULT_CONFIG: AppConfig = {
  appName: 'Dashboard Demo',
  appTitle: 'Dashboard Demo',
  author: 'Sunil Khandwala',
  defaultTheme: 'dracula',
  localStorageNamespace: 'angularDashboardTemplate',
  sidebarHeader: 'Dashboard Application',
  databaseName: 'angulardashboard',
  electronAppId: 'com.yourdomain.app',
  electronProductName: 'Dashboard App',
  menuItems: [
    {
      icon: 'home',
      label: 'Dashboard',
      route: '/',
      children: []
    },
    {
      icon: 'event',
      label: 'Events',
      route: '',
      children: [
        { icon: 'person', label: 'EventsSubMenu1', route: '/events/submenu1' },
        { icon: 'person', label: 'EventsSubMenu2', route: '/events/submenu2' },
        { icon: 'person', label: 'EventsSubMenu3', route: '/events/submenu3' },
      ]
    },
    {
      icon: 'build',
      label: 'Admin',
      route: '',
      children: [
        { icon: 'person', label: 'Settings', route: '/settings' },
        { icon: 'person', label: 'Roles', route: '/admin/roles' },
        { icon: 'person', label: 'Permissions', route: '/admin/permissions' },
        { icon: 'person', label: 'Users', route: '/admin/users' },
      ]
    },
    {
      icon: 'info',
      label: 'About',
      route: '',
      children: [
        { icon: 'person', label: 'Contact', route: '/about/contact' },
        { icon: 'person', label: 'Software', route: '/about/software' },
      ]
    },
  ]
};

/** Partial config type for overrides — all properties optional */
export type PartialAppConfig = Partial<AppConfig>;
