const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let iconPath = path.join(__dirname, 'assets/company.ico');
console.log('Icon Path:', iconPath);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Development
  mainWindow.loadURL('http://localhost:4200');
  
  // Production
  // mainWindow.loadFile(path.join(__dirname, 'dist/angulardashboard1/browser/index.html'));
  
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});