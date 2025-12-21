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
  menuItems = [
    { icon: 'home', label: 'Dashboard', route: '/' },
    { icon: 'person', label: 'Users', route: '/users' },
    { icon: 'event', label: 'Events', route: '/events' },
    { icon: 'build', label: 'Admin', route: '/admin' },
    { icon: 'info', label: 'About', route: '/about' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
