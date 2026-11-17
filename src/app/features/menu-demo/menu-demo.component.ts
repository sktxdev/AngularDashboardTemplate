import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppConfigService } from '../../config/app.config.service';
import { MenuItem } from '../../config/app.config.model';

/**
 * Demo component showing how to dynamically manipulate sidebar menu items.
 * Inject AppConfigService and call its methods at runtime.
 */
@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div style="padding: 24px; max-width: 600px;">
      <h1>Demo: Dynamic Menu Items</h1>
      <p>Click the buttons below to modify the sidebar menu at runtime.</p>

      <h3>Add / Remove Top-Level Menu Items</h3>
      <button mat-raised-button color="primary" (click)="addAnalyticsItem()">
        + Add "Analytics" Menu Item
      </button>
      <button mat-raised-button color="warn" (click)="removeAnalyticsItem()" style="margin-left: 8px;">
        - Remove "Analytics"
      </button>

      <h3>Add Child to Existing Parent</h3>
      <button mat-raised-button color="accent" (click)="addReportsChild()">
        + Add "Reports" child under "Admin"
      </button>

      <h3>Update an Existing Item</h3>
      <button mat-raised-button (click)="renameDashboard()">
        Rename "Dashboard" to "Home"
      </button>

      <h3>Replace All Menu Items</h3>
      <button mat-raised-button color="primary" (click)="loadCustomMenu()">
        Load Custom Menu
      </button>
      <button mat-raised-button (click)="resetMenu()" style="margin-left: 8px;">
        Reset to Default
      </button>

      <h3 *ngIf="menuItems.length">Current Menu Count: {{ menuItems.length }}</h3>
    </div>
  `
})
export class MenuDemoComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private configService: AppConfigService) {}

  ngOnInit(): void {
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Add a new top-level menu item */
  addAnalyticsItem(): void {
    const analyticsItem: MenuItem = {
      icon: 'analytics',
      label: 'Analytics',
      route: '/analytics',
      children: []
    };
    this.configService.addMenuItem(analyticsItem);
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Remove a menu item by label */
  removeAnalyticsItem(): void {
    this.configService.removeMenuItem('Analytics');
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Add a child to an existing parent */
  addReportsChild(): void {
    const reportChild: MenuItem = {
      icon: 'assessment',
      label: 'Reports',
      route: '/admin/reports'
    };
    this.configService.addChildMenuItem('Admin', reportChild);
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Update an existing menu item */
  renameDashboard(): void {
    this.configService.updateMenuItem('Dashboard', { label: 'Home', icon: 'home_filled' });
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Replace all menu items */
  loadCustomMenu(): void {
    const customMenu: MenuItem[] = [
      { icon: 'dashboard', label: 'Overview', route: '/' },
      { icon: 'shopping_cart', label: 'Orders', route: '/orders' },
      { icon: 'inventory_2', label: 'Products', route: '/products' },
    ];
    this.configService.setMenuItems(customMenu);
    this.menuItems = this.configService.menuItems();
  }

  /** Example: Reset to default */
  resetMenu(): void {
    // Re-import defaults by reloading the page or re-setting DEFAULT_CONFIG
    window.location.reload();
  }
}
