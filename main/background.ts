/*
 * Venture, an open-source Discord client focused on speed and convenience.
 * Copyright (c) 2023 Zyrenth
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { watch } from 'chokidar';
import { attachTitlebarToWindow, setupTitlebar } from 'custom-electron-titlebar/main';
import { app, ipcMain, Menu, nativeImage, Notification, powerSaveBlocker, session, shell, Tray } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import { URL } from 'url';

import { createWindow } from './helpers';
import ModifyHeader from './utilities/ModifyHeader';
import Store from './utilities/Store';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
    let firstCompile = true;

    watch(path.join(__dirname, '..'), { depth: 0 }).on('addDir', (e) => {
        if (path.basename(e) !== 'app') return;

        if (!firstCompile) {
            app.relaunch();
            app.exit();
        } else firstCompile = false;
    });
}

if (isProd) serve({ directory: 'app' });
else app.setPath('userData', `${app.getPath('userData')}-development`);

const filter = {
    urls: ['*://*.discord.com/*', '*://*.discordapp.com/*', '*://*.hcaptcha.com/*']
};

(async () => {
    await app.whenReady();

    const PSBid = powerSaveBlocker.start('prevent-display-sleep');
    console.log(`PowerSaveBlocker started with ID ${PSBid} ${powerSaveBlocker.isStarted(PSBid) ? 'successfully' : 'unsuccessfully'}`);

    app.on('before-quit', () => powerSaveBlocker.stop(PSBid));

    // app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

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
            // webSecurity: false // TODO: finish proper web-security
        }
    });

    app.on('browser-window-blur', () => {
        mainWindow.webContents.send('unfocused');
        console.log('blur');
    });
    app.on('browser-window-focus', () => {
        mainWindow.webContents.send('focused');
        console.log('focus');
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
        { label: `Venture${isProd ? '' : ' (Development)'}`, type: 'normal', enabled: !isProd, icon: icon.resize({ width: 16, height: 16 }), click: () => !isProd ? mainWindow.webContents.openDevTools({ mode: 'detach' }) : null },
        { label: 'Zyrenth.dev :3', type: 'normal', click: () => shell.openExternal('https://zyrenth.dev') },
        { type: 'separator' },
        { label: 'About Venture', type: 'normal' },
        { label: 'GitHub', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture') },
        { label: 'Contributors', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture/graphs/contributors') },
        { label: 'Support this project <3', type: 'normal', click: () => shell.openExternal('https://github.com/ZyrenthDev/Venture/') },
        { type: 'separator' },
        { label: 'Quit', type: 'normal', click: () => app.exit() },
    ]);

    tray.setToolTip(`Venture${isProd ? '' : ' (Development)'}`);
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.show();
    });

    /*      Web-security      */

    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        const { requestHeaders } = details;

        ModifyHeader(requestHeaders, 'Host', 'discord.com');
        ModifyHeader(requestHeaders, 'Referer', 'https://discord.com/');
        ModifyHeader(requestHeaders, 'Origin', null);

        delete details.requestHeaders.Origin;

        callback({ requestHeaders });
    });

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        const { responseHeaders } = details;

        const domain = new URL(details.url).hostname.split('.').slice(-2).join('.');
        const isHcaptcha = domain === 'hcaptcha.com';

        delete details.responseHeaders['Access-Control-Allow-Origin'];
        delete details.responseHeaders['Access-Control-Allow-Headers'];

        ModifyHeader(responseHeaders, 'Access-Control-Allow-Origin', isHcaptcha ? ['https://newassets.hcaptcha.com'] : isProd ? ['app://.'] : ['http://localhost:8888']);
        ModifyHeader(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
        ModifyHeader(responseHeaders, 'Access-Control-Allow-Credentials', ['true']);

        callback({ responseHeaders });
    });

    /*      Devtools and url loading      */

    if (isProd) await mainWindow.loadURL('app://./');
    else await mainWindow.loadURL(`http://localhost:${process.argv[2]}/`);

    /* if (!isProd)  */mainWindow.webContents.openDevTools({
        mode: 'detach'
    });
})();

app.on('window-all-closed', () => app.quit());

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});
