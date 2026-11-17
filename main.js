const { app, BrowserWindow, globalShortcut, session } = require('electron');
const path = require('path');
const url = require('url');
let mainWindow;

// Electron configuration — override these in your project
const ELECTRON_CONFIG = {
  appId: 'com.yourdomain.app',
  productName: 'Dashboard App',
  // Update the loadFile path to match your project name in angular.json
  distPath: 'dist/angular-dashboard1/browser/index.html'
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  // Development
  mainWindow.loadURL('http://localhost:4200/index.html');

  //mainWindow.loadFile("dist/angulardashboard1/browser/index.html");

    // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();

  // Production
  // mainWindow.loadFile(path.join(__dirname, ELECTRON_CONFIG.distPath));

  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
    createWindow();

    // Only enable DevTools in development
    if (process.env.NODE_ENV !== 'production') {
        // Your F12 toggle code
        globalShortcut.register('F12', () => {
          if (mainWindow && mainWindow.webContents) {
              if (mainWindow.webContents.isDevToolsOpened()) {
                  mainWindow.webContents.closeDevTools();
              } else {
                  mainWindow.webContents.openDevTools();
              }
          }
        });
    }
    // Register F12 to toggle DevTools

});

app.on('window-all-hidden', () => {
    // Unregister all global shortcuts
    globalShortcut.unregisterAll();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Create a new window when the app is activated (e.g., clicking the Dock icon on macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
