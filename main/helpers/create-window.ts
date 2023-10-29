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

import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    Menu,
    MenuItem,
    Rectangle,
    screen,
} from 'electron';
import Store from 'electron-store';

export const createWindow = (
    windowName: string,
    options: BrowserWindowConstructorOptions
): BrowserWindow => {
    const
        key = 'window-state',
        name = `window-state-${windowName}`,
        store = new Store<Rectangle>({ name }),
        defaultSize = {
            width: options.width,
            height: options.height,
        };

    let state = {};

    const restore = () => store.get(key, defaultSize);

    const getCurrentPosition = () => {
        const position = win.getPosition();
        const size = win.getSize();

        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1],
        };
    };

    const windowWithinBounds = (windowState, bounds) => {
        return (
            windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height
        );
    };

    const resetToDefaults = () => {
        const { bounds } = screen.getPrimaryDisplay();

        return Object.assign({}, defaultSize, {
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2,
        });
    };

    const ensureVisibleOnSomeDisplay = (windowState) => {
        const visible = screen.getAllDisplays().some((display) => {
            return windowWithinBounds(windowState, display.bounds);
        });

        if (!visible) return resetToDefaults();

        return windowState;
    };

    const saveState = () => {
        if (!win.isMinimized() && !win.isMaximized()) Object.assign(state, getCurrentPosition());

        store.set(key, state);
    };

    state = ensureVisibleOnSomeDisplay(restore());

    const win = new BrowserWindow({
        ...state,
        ...options,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences,
            sandbox: false
        },
    });

    Menu.setApplicationMenu(null);
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        new MenuItem({
            id: '1',
            label: '',
            visible: true
        })
    ]));

    win.on('close', saveState);

    return win;
};
