import { Menu, Tray, app, ipcMain, nativeImage, shell, session, Notification } from 'electron';
import serve from 'electron-serve';
import { setupTitlebar, attachTitlebarToWindow } from 'custom-electron-titlebar/main';
import path from 'path';
import { createWindow } from './helpers';
import Store from './utilities/Store';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) serve({ directory: 'app' });
else app.setPath('userData', `${app.getPath('userData')}-development`);

const filter = {
    urls: ['*://*.discord.com/*', '*://*.discordapp.com/*']
};

(async () => {
    await app.whenReady();

    if (process.platform === 'win32') {
        app.setAppUserModelId('Venture Client');
    }

    const store = new Store(app, 'Venture');

    /*      Create main window      */

    setupTitlebar();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,

        icon: isProd ? path.join(__dirname, 'images', 'logo.png') : path.join(__dirname, '..', 'resources', 'logo.png'),

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false // TODO: remove this
        }
    });

    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();

        if (!store.get('minimized-flag')) {
            new Notification({
                title: 'Venture',
                body: 'Venture is still running in the background. You can access it from the tray icon.',
                icon
            }).show();

            store.set('minimized-flag', true);
            store.save();
        }
    });

    attachTitlebarToWindow(mainWindow);

    /*      Tray Icon      */

    const icon = nativeImage.createFromPath(isProd ? path.join(__dirname, 'images', 'logo.png') : path.join(__dirname, '..', 'resources', 'icon.ico'));
    const tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Venture', type: 'normal', enabled: false, icon: icon.resize({ width: 16, height: 16 }) },
        { label: 'Zyrenth.dev :3', type: 'normal', click: () => shell.openExternal('https://zyrenth.dev') },
        { type: 'separator' },
        { label: 'About', type: 'normal' },
        { label: 'GitHub', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture') },
        { label: 'Contributors <3', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture/graphs/contributors') },
        { label: 'Quit', type: 'normal', click: () => app.exit() },
    ]);

    tray.setToolTip('Venture');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.show();
    });

    /*      Web-security      */

    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        //details.requestHeaders['Origin'] = 'https://discord.com/';
        details.requestHeaders['Host'] = 'discord.com';
        details.requestHeaders['Referer'] = 'https://discord.com/';
        details.requestHeaders['Origin'] = null;
        delete details.requestHeaders['Origin'];

        callback({ requestHeaders: details.requestHeaders });
    });

    /* session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        details.responseHeaders['Access-Control-Allow-Origin'] = ['app://.'];

        callback({ responseHeaders: details.responseHeaders });
    }); */

    /*      Devtools and url loading      */

    if (isProd) await mainWindow.loadURL('app://./');
    else await mainWindow.loadURL(`http://localhost:${process.argv[2]}/`);

    if (!isProd) mainWindow.webContents.openDevTools({
        mode: 'detach'
    });
})();

app.on('window-all-closed', () => app.quit());

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
