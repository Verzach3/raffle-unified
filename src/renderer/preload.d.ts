import { Channels } from 'main/preload';
import { Client } from 'types/Client';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
    };
    sharp: {
      test: () => void;
    };
    printApi: {
      test: () => void;
    };
    db: {
      initDB: () => void;
      addClient: (client: Client) => void;
      getClients: () => Client[];
      createList: (name: string) => void;
      getLists: () => { list: string; numbers: string[] }[];
      getList: (name: string) => { list: string; numbers: string[] } | undefined;
      getListKeys: () => string[];
      removeList: (name: string) => void;
      asignNumbersToClient: (
        client: Client,
        numbers: string[],
        list: string
      ) => void;
    }
  }
}

export {};
