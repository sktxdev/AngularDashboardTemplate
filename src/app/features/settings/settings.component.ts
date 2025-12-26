import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SettingsComponent implements OnInit {
  themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
    { id: 'dracula', name: 'Dracula', description: 'VSCode Dracula theme inspired' }
  ];

  selectedTheme: string = 'light';

  constructor() { }

  ngOnInit(): void {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
      this.applyTheme(savedTheme);
    }
  }

  selectTheme(themeId: string): void {
    this.selectedTheme = themeId;
    this.applyTheme(themeId);
    localStorage.setItem('theme', themeId);
  }

  onThemeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectTheme(selectElement.value);
  }

  private applyTheme(themeId: string): void {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-dracula');
    // Add selected theme class
    document.body.classList.add(`theme-${themeId}`);
  }

}
