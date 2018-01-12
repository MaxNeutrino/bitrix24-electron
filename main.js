const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        title: "bitrix24",
        width: 1280,
        height: 800,
        icon: path.join(__dirname, "bitrix.png")
    });
   // mainWindow.setIcon(electron.NativeImage().createFromPath(path.join("bitrix.png")));

    // and load the index.html of the app.
    mainWindow.loadURL("https://irens.bitrix24.ua/stream/");

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    const tray = new electron.Tray(path.join(__dirname, "bitrix.png"));

    const contextMenu = electron.Menu.buildFromTemplate([
        {label: "Выход", type: "normal", click: close}
    ]);

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    });
    mainWindow.on('show', () => {
        tray.setHighlightMode('always')
    });
    mainWindow.on('hide', () => {
        tray.setHighlightMode('never')
    });
    mainWindow.on('close', (event) => {
       event.preventDefault();
       mainWindow.hide();
    });

    tray.setContextMenu(contextMenu)
}

function close() {
    mainWindow.destroy()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
