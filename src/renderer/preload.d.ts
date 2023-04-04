import { Channels } from 'main/preload';
import { Client } from 'types/Client';
import RaffleData from '../types/RaffleData';
import { Day } from 'types/Day';

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
    previewApi: {
      generatePreview: (raffle: RaffleData) => Promise<string>;
    };
    printApi: {
      test: () => void;
      print: (raffles: Day[], printRemaining: boolean) => void;
      getRecentPrints: () => Promise<{ day: string; pdfPath: string; createdAt: number; }[]>;
      open: (path: string) => void;
    };
    db: {
      addClient: (client: Client) => void;
      getClients: () => Client[];
      getClient: (id: string) => Client | undefined;
      deleteClient: (id: string) => void;
      editClient: (client: Client, numbersToRemove: string[], numbersToAdd: string[], list:string) => void;
      createList: (name: string) => void;
      getLists: () => { list: string; numbers: string[] }[];
      getList: (
        name: string
      ) => { list: string; numbers: string[] } | undefined;
      getListKeys: () => string[];
      removeList: (name: string) => void;
    };
  }
}

export {};
