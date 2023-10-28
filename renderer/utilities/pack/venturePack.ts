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

export default class VenturePack {
    private _window: Window;
    customName: string;

    constructor(window: Window, customName?: string) {
        if (typeof window === 'undefined') throw new Error('VenturePack is only supported in the browser.');

        this._window = window;
        if (this.customName) this.customName = customName;
        else this.customName = '__vp_venturePack';

        if (!this._window[this.customName]) {
            this._window[this.customName] = [];

            this.createPackItem('_init', [true, Date.now()]);
        }
    }

    getWindowPack(): Array<[number, string, string, Object]> {
        return this._window[this.customName] as Array<[number, string, string, Object]>;
    }

    searchPack(pack: string): Object {
        return this.getWindowPack().find((p: [number, string, string, Object]) => p[2] === pack);
    }

    searchPackChunkId(packChunkId: string): Object {
        return this.getWindowPack().find((p: [number, string, string, Object]) => p[1] === packChunkId);
    }

    searchPackkId(packId: number): Object {
        return this.getWindowPack().find((p: [number, string, string, Object]) => p[0] === packId);
    }

    createPackItem(pack: string, data: Object): void {
        if (this.searchPack(pack)) this.deletePackItemByName(pack);

        this.getWindowPack().push([this.getWindowPack().length, btoa(Math.floor(Date.now() / 1000).toString() + this.getWindowPack().length.toString()), pack, data]);
    }

    deletePackItemByName(pack: string): void {
        this.getWindowPack().splice(this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[2] === pack), 1);
    }

    deletePackItemByChunkId(packChunkId: string): void {
        this.getWindowPack().splice(this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[1] === packChunkId), 1);
    }

    deletePackItemByPackId(packId: number): void {
        this.getWindowPack().splice(this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[0] === packId), 1);
    }

    updatePackItemByName(pack: string, data: Object): void {
        this.getWindowPack()[this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[2] === pack)][3] = data;
    }

    updatePackItemByChunkId(packChunkId: string, data: Object): void {
        this.getWindowPack()[this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[1] === packChunkId)][3] = data;
    }

    updatePackItemByPackId(packId: number, data: Object): void {
        this.getWindowPack()[this.getWindowPack().findIndex((p: [number, string, string, Object]) => p[0] === packId)][3] = data;
    }

    async waitForPack(pack: string): Promise<Object> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.searchPack(pack)) {
                    clearInterval(interval);
                    resolve(this.searchPack(pack));
                }
            }, 100);
        });
    }

    async waitForPackChunkId(packChunkId: string): Promise<Object> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.searchPackChunkId(packChunkId)) {
                    clearInterval(interval);
                    resolve(this.searchPackChunkId(packChunkId));
                }
            }, 100);
        });
    }

    async waitForPackId(packId: number): Promise<Object> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.searchPackkId(packId)) {
                    clearInterval(interval);
                    resolve(this.searchPackkId(packId));
                }
            }, 100);
        });
    }
}
