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

import EventEmitter from 'events';

export default class fxWebsocket {
    ws: WebSocket;
    url: string;
    events: EventEmitter;

    constructor(url: string) {
        this.url = url;
        this.events = new EventEmitter();

        // Auto reconnect;
        this.events.on('close', () => setTimeout(() => this.__init(url), 5000));

        this.__init(url);
    }

    private __init(url) {
        this.ws = new WebSocket(url);

        this.ws.onopen = (e: Event) => this.events.emit('open', e);
        this.ws.onclose = (e: CloseEvent) => this.events.emit('close', e);
        this.ws.onerror = (e: Event) => this.events.emit('wserror', e);
        this.ws.onmessage = (e: MessageEvent) => this.events.emit('message', e);
    }

    send(data: any) {
        this.ws.send(data);
    }

    close() {
        this.ws.close();
    }

    on(event: string, callback: (...args: any[]) => void) {
        this.events.on(event, callback);
    }

    once(event: string, callback: (...args: any[]) => void) {
        this.events.once(event, callback);
    }

    off(event: string, callback: (...args: any[]) => void) {
        this.events.off(event, callback);
    }

    addListener(event: string, callback: (...args: any[]) => void) {
        this.events.addListener(event, callback);
    }

    removeAllListeners(event: string) {
        this.events.removeAllListeners(event);
    }

    removeListener(event: string, callback: (...args: any[]) => void) {
        this.events.removeListener(event, callback);
    }

    listeners(event: string) {
        return this.events.listeners(event);
    }

    listenerCount(event: string) {
        return this.events.listenerCount(event);
    }

    onopen(callback: (e?) => void) {
        this.events.on('open', callback);
    }

    onclose(callback: (e?) => void) {
        this.events.on('close', callback);
    }

    onerror(callback: (e?) => void) {
        this.events.on('error', callback);
    }

    onmessage(callback: (e?: MessageEvent) => void) {
        this.events.on('message', callback);
    }

    get readyState() {
        return this.ws.readyState;
    }
}
