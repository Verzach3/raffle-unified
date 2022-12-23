import { Client } from 'types/Client';
// @ts-ignore
const { LocalStorage } = await import('lowdb/browser');
// @ts-ignore
const { LowSync } = await import('lowdb');
// @ts-ignore
const { nanoid } = await import('nanoid');
type Data = {
  clients: Client[];
  numbers: { list: string; numbers: string[] }[];
};

const db = new LowSync<Data>(new LocalStorage('clients-db'));
db.read();
db.data ||= { clients: [], numbers: [] };

if (window.db === undefined)
  window.db = {
    initDB: () => {
      console.log('DB Inicializada');
    },
    addClient: addClient,

    getClients: () => {
      return db.data?.clients || [];
    },

    createList: createList,
    getLists: getLists,
    getList: getList,
    getListKeys: getListKeys,
    removeList: removeList,
    asignNumbersToClient: asignNumbersToClient,
  };

function addClient (client: Client) {
  // check if the user already exists
  if (db.data?.clients?.find((c) => c.name === client.name)) {
    throw new Error('El cliente ya existe');
  }
  if (!db.data) db.data = { clients: [], numbers: [] };
  client.id = nanoid();
  db.data.clients.push(client);
  db.write();
}

function getClient(id: string) {
  return db.data?.clients?.find((c) => c.id === id);
}

function deleteClient(id: string) {
  // before deleting the client, we need to remove the numbers from the list and reassign them to numbers
  const client = getClient(id);
  if (client === undefined) return;
  client.numbers.forEach(
    (list: { list: string; numbers: ConcatArray<string> }) => {
      const listData = getList(list.list);
      if (listData === undefined) return;
      listData.numbers = listData.numbers.concat(list.numbers);
    }
  );
  if (db.data === null) return;
  db.data.clients = db.data.clients.filter((c) => c.id !== id);
  db.write();
}

function editClient(client: Client) {
  deleteClient(client.id);
  addClient(client);
}

function createList(name: string) {
  // fail if list already exists
  if (getList(name) !== undefined) {
    throw new Error('la lista ya existe');
  }
  if (db.data === null) return;
  // numbers is an array of numbers from 0 to 999
  const numbers = Array.from(Array(1000).keys()).map((n) => n.toString());
  db.data!.numbers.push({ list: name, numbers });
  db.write();
}

function getLists() {
  return db.data?.numbers || [];
}

function getList(name: string) {
  return getLists().find((list) => list.list === name);
}

function getListKeys() {
  return getLists().map((list) => list.list);
}

function removeList(name: string) {
  if (db.data === null) return;
  db.data.numbers = db.data.numbers.filter((list) => list.list !== name);
  db.write();
}

function asignNumbersToClient(client: Client, numbers: string[], list: string) {
  // Assign numbers to client
  client.numbers = [{ list, numbers }];
  // Remove numbers from list
  const listData = getList(list);
  if (listData === undefined) return;
  listData.numbers = listData.numbers.filter((n) => !numbers.includes(n));
  db.write();
  editClient(client);
}
