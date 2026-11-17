import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppConfigService } from '../../../config/app.config.service';
import { MenuItem } from '../../../config/app.config.model';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MenuItemComponent
  ]
})
export class SidebarComponent implements OnInit {
  private readonly MIN_WIDTH = 150;
  private readonly MAX_WIDTH = 500;
  private readonly DEFAULT_WIDTH = 250;

  sidebarWidth: number = this.DEFAULT_WIDTH;
  isResizing: boolean = false;
  private startX: number = 0;
  private startWidth: number = 0;

  menuItems: MenuItem[] = [];

  constructor(
    private elementRef: ElementRef,
    public configService: AppConfigService
  ) { }

  ngOnInit(): void {
    this.menuItems = this.configService.menuItems;
    // Load saved width from localStorage
    const savedWidth = localStorage.getItem(
      `${this.configService.localStorageNamespace}.currentNavWidth`
    );
    if (savedWidth) {
      const width = parseInt(savedWidth, 10);
      if (width >= this.MIN_WIDTH && width <= this.MAX_WIDTH) {
        this.sidebarWidth = width;
      }
    }
    this.updateSidebarWidth();
  }

  onResizeHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarWidth;
    document.body.classList.add('resizing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing) return;

    const delta = event.clientX - this.startX;
    const newWidth = this.startWidth + delta;

    if (newWidth >= this.MIN_WIDTH && newWidth <= this.MAX_WIDTH) {
      this.sidebarWidth = newWidth;
      this.updateSidebarWidth();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.classList.remove('resizing');
      // Save to localStorage
      localStorage.setItem(
        `${this.configService.localStorageNamespace}.currentNavWidth`,
        this.sidebarWidth.toString()
      );
    }
  }

  private updateSidebarWidth(): void {
    const sidebarElement = this.elementRef.nativeElement.querySelector('.mac-sidebar');
    if (sidebarElement) {
      sidebarElement.style.width = `${this.sidebarWidth}px`;
    }

    // Update the mat-drawer width as well
    const drawer = this.elementRef.nativeElement.closest('mat-drawer');
    if (drawer) {
      drawer.style.width = `${this.sidebarWidth}px`;
      drawer.style.minWidth = `${this.sidebarWidth}px`;
      drawer.style.maxWidth = `${this.sidebarWidth}px`;
    }

    // Trigger a window resize event to make mat-drawer-container recalculate layout
    window.dispatchEvent(new Event('resize'));
  }

}
