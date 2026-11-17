import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfigService } from './config/app.config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = '';

  constructor(private configService: AppConfigService) {
    this.title = this.configService.appTitle;
  }

  ngOnInit(): void {
    // Initialize theme on app launch/reload
    const savedTheme = localStorage.getItem(
      `${this.configService.localStorageNamespace}.selectedTheme`
    );
    const themeToApply = savedTheme || this.configService.defaultTheme;
    this.applyTheme(themeToApply);
  }

  private applyTheme(themeId: string): void {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-dracula');
    // Add selected theme class
    document.body.classList.add(`theme-${themeId}`);
  }
}
