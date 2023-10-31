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

import { Titlebar, TitlebarColor } from 'custom-electron-titlebar';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

declare global {
    interface Window {
        __vp_VentureNative: {
            messaging: typeof handler;
        };
    }
}

const handler = {
    send: (channel: string, value: unknown) => ipcRenderer.send(channel, value),
    on: (channel: string, callback: (...args: unknown[]) => void) => {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
    },
};

let focused = true;

contextBridge.exposeInMainWorld('__vp_VentureNative', {
    get: () => ({
        messaging: handler,
        focused
    })
});

handler.on('focused', () => focused = true);
handler.on('unfocused', () => focused = false);

contextBridge.exposeInMainWorld('ipc', handler);

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar({
        backgroundColor: TitlebarColor.fromHex('#00000000'),
        icon: '/images/LogoText.svg',
        shadow: true,
    });
    window.__vp_VentureNative = {
        messaging: handler
    };
});

export type IpcHandler = typeof handler;
