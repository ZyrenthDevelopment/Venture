import EventEmitter from "events";

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

        this.ws.onopen = (e) => this.events.emit('open', e);
        this.ws.onclose = (e) => this.events.emit('close', e);
        this.ws.onerror = (e) => this.events.emit('error', e);
        this.ws.onmessage = (e) => this.events.emit('message', e);
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