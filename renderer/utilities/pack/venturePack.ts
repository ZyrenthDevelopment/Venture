export default class VenturePack {
    private _window: Window;

    constructor(window: Window) {
        if (typeof window === 'undefined') throw new Error('VenturePack is only supported in the browser.');

        this._window = window;

        if (!this._window['venturePack']) {
            this._window['venturePack'] = [];

            this.createPackItem('_init', [true, Date.now()]);
        }
    }

    getWindowPack(): Array<[number, string, string, Object]> {
        return this._window['venturePack'] as Array<[number, string, string, Object]>;
    }

    searchPack(pack: string): Object {
        return this.getWindowPack().find((p: [number, string, string, Object]) => p[2] === pack);
    }

    searchPackChunkId(packChunkId: number): Object {
        return this.getWindowPack().find((p: [number, string, string, Object]) => p[0] === packChunkId);
    }

    createPackItem(pack: string, data: Object): void {
        this.getWindowPack().push([this.getWindowPack().length, btoa(Math.floor(Date.now() / 1000).toString() + this.getWindowPack().length), pack, data]);
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
};