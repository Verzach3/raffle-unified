import { ipcMain } from 'electron';
import { Day } from '../types/Day';
import { printDay } from './printManager';
import { getRecentPrints } from './getRecentPrints';

// NOTE: Every cliend should have unique numbers
// const mockClients: Client[] = [
//   {
//     name: 'Client1',
//     numbers: ['1', '2', '3'],
//     id: '1',
//   },
//   {
//     name: 'Client2',
//     numbers: ['4', '5', '6'],
//     id: '2',
//   },
//   {
//     name: 'Client3',
//     numbers: ['7', '8', '9'],
//     id: '3',
//   },
//   {
//     name: 'Client4',
//     numbers: ['10', '11', '12'],
//     id: '4',
//   },
//   {
//     name: 'Client5',
//     numbers: ['13', '14', '15'],
//     id: '5',
//   },
//   {
//     name: 'Client6',
//     numbers: ['16', '17', '18'],
//     id: '6',
//   },
//   {
//     name: 'Client7',
//     numbers: ['19', '20', '21'],
//     id: '7',
//   },
//   {
//     name: 'Client8',
//     numbers: ['22', '23', '24'],
//     id: '8',
//   },
//   {
//     name: 'Client9',
//     numbers: ['25', '26', '27'],
//     id: '9',
//   },
//   {
//     name: 'Client10',
//     numbers: ['28', '29', '30'],
//     id: '10',
//   },
//   {
//     name: 'Client11',
//     numbers: ['31', '32', '33'],
//     id: '11',
//   },
//   {
//     name: 'Client12',
//     numbers: ['34', '35', '36'],
//     id: '12',
//   },
//   {
//     name: 'Client13',
//     numbers: ['37', '38', '39'],
//     id: '13',
//   },
//   {
//     name: 'Client14',
//     numbers: ['40', '41', '42'],
//     id: '14',
//   },
//   {
//     name: 'Client15',
//     numbers: ['43', '44', '45'],
//     id: '15',
//   },
//   {
//     name: 'Client16',
//     numbers: ['46', '47', '48'],
//     id: '16',
//   },
// ];

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
