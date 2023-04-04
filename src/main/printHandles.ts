import { ipcMain } from 'electron';
import { Day } from '../types/Day';
import { printDay } from './printManager';
import { getRecentPrints } from './getRecentPrints';
import { exec } from 'child_process';

// const mockDay: Day = {
//   date: '2021-01-01',
//   prize: 'mercado',
//   prizeValue: '200.000',
//   lottery: 'Loteria Nacional',
//   price: '500',
//   encerradoValue: '2.000',
//   clients: mockClients as Client[],
//   line1Info: 'Resp: FREDDY Calle 20 No. 12-76  CEL: 3157807292',
//   line2Info: 'PAGO DE PREMIOS DE LUNES A SÁBADO DE 4 P.M. A 6 P.M',
//   line3Info: 'Boleta rota o enmendada no se paga - caducidad 8 dìas.',
// };

function testPrint(dayToPrint: Day[]) {
  dayToPrint.forEach((day: Day) => {
    printDay(day);
  });
}
ipcMain.handle('print:test', () => {
  try {
    // printDay(mockDay);
    console.error("Not implemented yet");
  } catch (error) {
    console.log('Error: ', error);
  }
});

ipcMain.handle('print:batch', async (event, days: Day[], printRemaining: boolean) => {
  try {
    days.forEach((day: Day) => {
      printDay(day, printRemaining);
    });
    console.log('args: ', days, printRemaining);
  } catch (error) {
    console.log('Error: ', error);
  }
});

ipcMain.handle("print:recents", async() => {
  try {
    return await getRecentPrints()
  } catch (error) {
    console.log('Error: ', error);
  }
})

ipcMain.handle("print:open", async (event, path: string) => {
  try {
    exec(`start "" "${path}"`);
  } catch (error) {
    console.log('Error: ', error);
  }
})

