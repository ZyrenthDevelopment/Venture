import { existsSync, readFileSync, writeFile, writeFileSync } from "fs";
import path from "path";

export default class Store {
    app: Electron.App;
    name: string;
    path: string;

    store: Object;

    constructor (app: Electron.App, name: string) {
        this.app = app;
        this.name = name;

        this.path = path.join(this.app.getPath('userData'), `${this.name}.json`);

        if (!existsSync(this.path)) writeFileSync(this.path, '{}', 'utf-8');

        this.store = this.read();
    };

    get (key: string): any {
        return this.store[key];
    };

    set (key: string, value: any): void {
        const data = this.store;
        data[key] = value;
    };

    delete (key: string): void {
        const data = this.store;
        delete data[key];
    }

    read () {
        return JSON.parse(readFileSync(this.path, 'utf-8'));
    };

    write (data: Object) {
        writeFileSync(this.path, JSON.stringify(data, null, 4), 'utf-8');
    }

    save () {
        this.write(this.store);
    }
}