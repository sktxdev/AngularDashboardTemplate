import { Injectable, signal, computed } from '@angular/core';
import { AppConfig, DEFAULT_CONFIG } from './app.config.model';
import { MenuItem } from './app.config.model';

/**
 * Application configuration service.
 * Loads DEFAULT_CONFIG and merges any runtime overrides from app.config.overrides.ts.
 * Components inject this service to access configurable values.
 *
 * The menu items are reactive — use addMenuItem(), removeMenuItem(), or updateMenuItems()
 * to modify the sidebar navigation at runtime.
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config = signal<AppConfig>({ ...DEFAULT_CONFIG });

  // Reactive menu items — components can read this as a signal or subscribe via menuItems$()
  readonly menuItems = computed(() => this._config().menuItems);

  constructor() {
    this.loadOverrides();
  }

  get config(): AppConfig { return this._config(); }
  get appName(): string { return this._config().appName; }
  get appTitle(): string { return this._config().appTitle; }
  get author(): string { return this._config().author; }
  get localStorageNamespace(): string { return this._config().localStorageNamespace; }
  get defaultTheme(): string { return this._config().defaultTheme; }
  get sidebarHeader(): string { return this._config().sidebarHeader; }
  get databaseName(): string { return this._config().databaseName; }
  get electronAppId(): string { return this._config().electronAppId; }
  get electronProductName(): string { return this._config().electronProductName; }

  /**
   * Replace all menu items with a new array.
   */
  setMenuItems(items: MenuItem[]): void {
    const current = this._config();
    this._config.set({ ...current, menuItems: [...items] });
  }

  /**
   * Add a menu item at the end of the list (or at a specific index).
   * @param item The menu item to add.
   * @param index Optional index to insert at (defaults to end).
   */
  addMenuItem(item: MenuItem, index?: number): void {
    const items = [...this.menuItems()];
    if (index !== undefined && index >= 0 && index <= items.length) {
      items.splice(index, 0, item);
    } else {
      items.push(item);
    }
    this.setMenuItems(items);
  }

  /**
   * Remove a menu item by its label.
   * @param label The label of the menu item to remove.
   */
  removeMenuItem(label: string): void {
    const items = this.menuItems().filter((item) => item.label !== label);
    this.setMenuItems(items);
  }

  /**
   * Update a menu item by its label (finds the first match).
   * @param oldLabel The current label of the item to update.
   * @param updates Partial MenuItem with the new values.
   */
  updateMenuItem(oldLabel: string, updates: Partial<MenuItem>): void {
    const items = this.menuItems().map((item) =>
      item.label === oldLabel ? { ...item, ...updates } : item
    );
    this.setMenuItems(items);
  }

  /**
   * Add a child to an existing parent menu item (by parent label).
   * @param parentLabel The label of the parent menu item.
   * @param child The child menu item to add.
   */
  addChildMenuItem(parentLabel: string, child: MenuItem): void {
    const items = this.menuItems().map((item) => {
      if (item.label === parentLabel && item.children) {
        return { ...item, children: [...item.children!, child] };
      }
      return item;
    });
    this.setMenuItems(items);
  }

  private loadOverrides(): void {
    import('./app.config.overrides')
      .then((module) => {
        if (module.OVERRIDES) {
          const current = this._config();
          this._config.set({ ...current, ...module.OVERRIDES });
        }
      })
      .catch(() => {
        // No overrides file — use defaults
      });
  }
}
