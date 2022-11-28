import { ipcMain } from 'electron';
import { Day } from '../types/Day';
import { Client } from '../types/Client';
import { printDay } from './printManager';

// NOTE: Every cliend should have unique numbers
const mockClients: Omit<Client, "_id"| "_rev">[] = [
  {
    name: 'Client1',
    asignedNumbers: ['1', '2', '3'],
  },
  {
    name: 'Client2',
    asignedNumbers: ['4', '5', '6'],
  },
  {
    name: 'Client3',
    asignedNumbers: ['7', '8', '9'],
  },
  {
    name: 'Client4',
    asignedNumbers: ['10', '11', '12'],
  },
  {
    name: 'Client5',
    asignedNumbers: ['13', '14', '15'],
  },
  {
    name: 'Client6',
    asignedNumbers: ['16', '17', '18'],
  },
  {
    name: 'Client7',
    asignedNumbers: ['19', '20', '21'],
  },
  {
    name: 'Client8',
    asignedNumbers: ['22', '23', '24'],
  },
  {
    name: 'Client9',
    asignedNumbers: ['25', '26', '27'],
  },
  {
    name: 'Client10',
    asignedNumbers: ['28', '29', '30'],
  },
  {
    name: 'Client11',
    asignedNumbers: ['31', '32', '33'],
  },
  {
    name: 'Client12',
    asignedNumbers: ['34', '35', '36'],
  },
  {
    name: 'Client13',
    asignedNumbers: ['37', '38', '39'],
  },
  {
    name: 'Client14',
    asignedNumbers: ['40', '41', '42'],
  },
  {
    name: 'Client15',
    asignedNumbers: ['43', '44', '45'],
  },
  {
    name: 'Client16',
    asignedNumbers: ['46', '47', '48'],
  },
];

const mockDay: Day = {
  date: '2021-01-01',
  prize: 'mercado',
  prizeValue: '200.000',
  lottery: 'Lotofácil',
  price: '500',
  encerradoValue: '2.000',
  clients: mockClients as Client[],
  line1Info: 'Resp: FREDDY Calle 20 No. 12-76  CEL: 3157807292',
  line2Info: 'PAGO DE PREMIOS DE LUNES A SÁBADO DE 4 P.M. A 6 P.M',
  line3Info: 'Boleta rota o enmendada no se paga - caducidad 8 dìas.',
};

function testPrint(dayToPrint: Day[]) {
  dayToPrint.forEach((day: Day) => {
    printDay(day);
  });
}
ipcMain.handle('print:test', () => {
  try {
    printDay(mockDay);
  } catch (error) {
    console.log('Error: ', error);
  }
});
