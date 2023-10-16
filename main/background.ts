import { Menu, Tray, app, ipcMain, nativeImage, shell, session } from 'electron';
import serve from 'electron-serve';
import { setupTitlebar, attachTitlebarToWindow } from 'custom-electron-titlebar/main';
import path from 'path';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) serve({ directory: 'app' });
else app.setPath('userData', `${app.getPath('userData')} (development)`);

const filter = {
    urls: ['*://*.discord.com/*', '*://*.discordapp.com/*']
};

(async () => {
    await app.whenReady()

    const icon = nativeImage.createFromPath(path.join(__dirname, '..', 'resources', 'icon.ico'));
    const tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Venture', type: 'normal', enabled: false },
        { label: 'Zyrenth.dev :3', type: 'normal', click: () => shell.openExternal('https://zyrenth.dev') },
        { type: 'separator' },
        { label: 'About', type: 'normal' },
        { label: 'GitHub', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture') },
        { label: 'Contributors <3', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture/graphs/contributors') },
    ]);

    tray.setToolTip('Venture');
    tray.setContextMenu(contextMenu);

    app.setUserTasks([]);
    /* app.setUserTasks([
        {
            program: `C:\\Windows\\System32\\cmd.exe`,
            arguments: '/c start https://zyrenth.dev',
            iconPath: process.execPath,
            iconIndex: 0,
            title: 'Zyrenth.dev :3',
            description: 'open the best website'
        }
    ]); */

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

    setupTitlebar();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,

        icon: path.join(__dirname, '..', 'resources', 'icon.ico'),

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false // TODO: remove this
        }
    });

    attachTitlebarToWindow(mainWindow);

    if (isProd) await mainWindow.loadURL('app://./');
    else await mainWindow.loadURL(`http://localhost:${process.argv[2]}/`);

    mainWindow.webContents.openDevTools({
        mode: 'detach'
    });
})();

app.on('window-all-closed', () => app.quit());

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
