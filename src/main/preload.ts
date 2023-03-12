import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Day } from 'types/Day';
import RaffleData from 'types/RaffleData';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});

contextBridge.exposeInMainWorld('sharp', {
  test: () => ipcRenderer.invoke('sharp:test'),
});

contextBridge.exposeInMainWorld('printApi', {
  test: () => ipcRenderer.invoke('print:test'),
  print: (days: Day[], printRemaining: boolean) => ipcRenderer.invoke('print:batch', days, printRemaining),
  onUpdate: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on("print:progress", callback),
  getRecentPrints: () => ipcRenderer.invoke('print:recents'),
});

contextBridge.exposeInMainWorld('previewApi', {
  generatePreview: (raffle: RaffleData) =>
    ipcRenderer.invoke('preview:generate', raffle),
});

