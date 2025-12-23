const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let mainWindow;

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
  mainWindow.webContents.openDevTools();

  // Production
  // mainWindow.loadFile(path.join(__dirname, 'dist/angulardashboard1/browser/index.html'));

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
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
