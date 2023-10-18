import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { Titlebar, TitlebarColor } from 'custom-electron-titlebar';

window.addEventListener('DOMContentLoaded', () => new Titlebar({
    backgroundColor: TitlebarColor.fromHex('#00000000'),
    icon: '/images/LogoText.svg',
    shadow: true,
}));

const handler = {
    send: (channel: string, value: unknown) => ipcRenderer.send(channel, value),
    on: (channel: string, callback: (...args: unknown[]) => void) => {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
    },
}

contextBridge.exposeInMainWorld('ipc', handler);

export type IpcHandler = typeof handler;
