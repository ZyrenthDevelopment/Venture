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

import * as Electron from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default class Store {
    app: Electron.App;
    name: string;
    path: string;
    store: any;

    constructor(app: Electron.App, name: string) {
        this.app = app;
        this.name = name;

        this.path = path.join(this.app.getPath('userData'), `${this.name}.json`);

        if (!existsSync(this.path)) writeFileSync(this.path, '{}', 'utf-8');

        this.store = this.read();
    }

    get(key: string): any {
        return this.store[key];
    }

    set(key: string, value: any): void {
        const data = this.store;
        data[key] = value;
    }

    delete(key: string): void {
        const data = this.store;
        delete data[key];
    }

    read() {
        return JSON.parse(readFileSync(this.path, 'utf-8'));
    }

    write(data: Object) {
        writeFileSync(this.path, JSON.stringify(data, null, 4), 'utf-8');
    }

    save() {
        this.write(this.store);
    }
}
