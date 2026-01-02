import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const storageKey = 'angularDashboardTemplate.currentNavWidth';

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ SidebarComponent ],
      providers: [ provideRouter([]) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up localStorage and body classes after each test
    localStorage.clear();
    document.body.classList.remove('resizing');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default width', () => {
    expect(component.sidebarWidth).toBe(250);
  });

  it('should load saved width from localStorage on init', () => {
    localStorage.setItem(storageKey, '300');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(300);
  });

  it('should not load width if it is below minimum', () => {
    localStorage.setItem(storageKey, '100');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should not load width if it is above maximum', () => {
    localStorage.setItem(storageKey, '600');

    const newFixture = TestBed.createComponent(SidebarComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.sidebarWidth).toBe(250);
  });

  it('should set isResizing to true when resize handle is pressed', () => {
    const event = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(event);

    expect(component.isResizing).toBeTruthy();
    expect(document.body.classList.contains('resizing')).toBeTruthy();
  });

  it('should update width during mouse move when resizing', () => {
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 300 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(300);
  });

  it('should not update width below minimum during resize', () => {
    component.sidebarWidth = 200;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 100 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(200);
  });

  it('should not update width above maximum during resize', () => {
    component.sidebarWidth = 400;
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 400 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 600 });
    component.onMouseMove(mouseMoveEvent);

    expect(component.sidebarWidth).toBe(400);
  });

  it('should save width to localStorage on mouse up', () => {
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 250 });
    component.onResizeHandleMouseDown(mouseDownEvent);

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 320 });
    component.onMouseMove(mouseMoveEvent);

    component.onMouseUp();

    expect(localStorage.getItem(storageKey)).toBe('320');
    expect(component.isResizing).toBeFalsy();
    expect(document.body.classList.contains('resizing')).toBeFalsy();
  });

  it('should have menu items defined', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should have deeply nested menu structure', () => {
    const adminMenu = component.menuItems.find(item => item.label === 'Admin');
    expect(adminMenu).toBeDefined();

    const usersMenu = adminMenu?.children?.find((child: any) => child.label === 'Users');
    expect(usersMenu).toBeDefined();

    const userSubMenu3 = usersMenu?.children?.find((child: any) => child.label === 'UserSubMenu3');
    expect(userSubMenu3).toBeDefined();
    expect(userSubMenu3?.children).toBeDefined();
    expect(userSubMenu3?.children?.length).toBeGreaterThan(0);
  });

  it('should support 5+ levels of nesting', () => {
    const adminMenu = component.menuItems.find(item => item.label === 'Admin');
    const usersMenu = adminMenu?.children?.find((child: any) => child.label === 'Users');
    const userSubMenu3 = usersMenu?.children?.find((child: any) => child.label === 'UserSubMenu3');
    const userSubMenu31 = userSubMenu3?.children?.find((child: any) => child.label === 'UserSubMenu3-1');
    const userSubMenu311 = userSubMenu31?.children?.find((child: any) => child.label === 'UserSubMenu3-1-1');

    expect(userSubMenu311).toBeDefined();
    expect(userSubMenu311?.children).toBeDefined();

    // Check for 6th level
    const level5Item2 = userSubMenu311?.children?.find((child: any) => child.label === 'Level5-Item2');
    expect(level5Item2).toBeDefined();
    expect(level5Item2?.children).toBeDefined();
    expect(level5Item2?.children?.length).toBeGreaterThan(0);
  });

  it('should have correct menu structure for Events', () => {
    const eventsMenu = component.menuItems.find(item => item.label === 'Events');
    expect(eventsMenu).toBeDefined();
    expect(eventsMenu?.children?.length).toBe(3);
  });

  it('should have correct menu structure for About', () => {
    const aboutMenu = component.menuItems.find(item => item.label === 'About');
    expect(aboutMenu).toBeDefined();
    expect(aboutMenu?.children?.length).toBe(2);
  });
});
