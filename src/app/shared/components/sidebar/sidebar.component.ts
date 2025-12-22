import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class SidebarComponent implements OnInit {
  expandedItems: { [key: string]: boolean } = {};

  menuItems = [
    { 
      icon: 'home', label: 'Dashboard', route: '/',
      children: []
    },
    { 
      icon: 'person', label: 'Users', route: '', 
      children: [
        { icon: 'person', label: 'UserSubMenu1', route: '/users' },
        { icon: 'person', label: 'UserSubMenu2', route: '/users' },
        { icon: 'person', label: 'UserSubMenu3', route: '/users' },
      ]
    },
    { 
      icon: 'event', label: 'Events', route: '', 
      children: [
        { icon: 'person', label: 'EventsSubMenu1', route: '/events' },
        { icon: 'person', label: 'EventsSubMenu2', route: '/events' },
        { icon: 'person', label: 'EventsSubMenu3', route: '/events' },
      ]
    },
    { 
      icon: 'build', label: 'Admin', route: '', 
      children: [
        { icon: 'person', label: 'Settings', route: '/admin/settings' },
        { icon: 'person', label: 'Roles', route: '/admin/roles' },
        { icon: 'person', label: 'Permissions', route: '/admin/permissions' },
      ]
    },
    { 
      icon: 'info', label: 'About', route: '',
      children: [
        { icon: 'person', label: 'Contact', route: '/about/contact' },
        { icon: 'person', label: 'Software', route: '/about/software' },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSubmenu(label: string): void {
    const wasExpanded = this.expandedItems[label];
    
    // Collapse all menus
    Object.keys(this.expandedItems).forEach(key => {
      this.expandedItems[key] = false;
    });
    
    // Toggle the clicked menu (expand if it was closed, keep closed if it was open)
    this.expandedItems[label] = !wasExpanded;
  }

  isExpanded(label: string): boolean {
    return this.expandedItems[label] || false;
  }

}
