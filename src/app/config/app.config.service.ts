import { Injectable } from '@angular/core';
import { AppConfig, DEFAULT_CONFIG } from './app.config.model';

/**
 * Application configuration service.
 * Loads DEFAULT_CONFIG and merges any runtime overrides from app.config.overrides.ts.
 * Components inject this service to access configurable values.
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _config: AppConfig = { ...DEFAULT_CONFIG };

  constructor() {
    this.loadOverrides();
  }

  get config(): AppConfig { return this._config; }
  get appName(): string { return this._config.appName; }
  get appTitle(): string { return this._config.appTitle; }
  get author(): string { return this._config.author; }
  get localStorageNamespace(): string { return this._config.localStorageNamespace; }
  get defaultTheme(): string { return this._config.defaultTheme; }
  get sidebarHeader(): string { return this._config.sidebarHeader; }
  get databaseName(): string { return this._config.databaseName; }
  get menuItems(): AppConfig['menuItems'] { return this._config.menuItems; }
  get electronAppId(): string { return this._config.electronAppId; }
  get electronProductName(): string { return this._config.electronProductName; }

  private loadOverrides(): void {
    import('./app.config.overrides')
      .then((module) => {
        if (module.OVERRIDES) {
          this._config = { ...this._config, ...module.OVERRIDES };
        }
      })
      .catch(() => {
        // No overrides file — use defaults
      });
  }
}
