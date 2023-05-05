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

function addClient(client: Client) {
  // check if the user already exists
  if (db.data?.clients?.find((c) => c.name === client.name)) {
    throw new Error('El cliente ya existe');
  }
  if (!db.data) db.data = { clients: [], numbers: [] };
  client.id = nanoid();
  db.data.clients.push(client);
  db.write();
}

function getData() {
  return db.data || {}
}

function setData(data: any) {
  db.data = data
  db.write();
}

function getClients() {
  return db.data?.clients || [];
}

function getClient(id: string) {
  return db.data?.clients.find((c) => c.id === id);
}
function getLists() {
  return db.data?.numbers || [];
}

function getList(name: string) {
  return getLists().find((list) => list.list === name);
}
function deleteClient(id: string) {
  // The delete function removes the client and reassigns the numbers to the list
  const clientData = getClient(id);
  if (clientData === undefined) return;
  // remove client
  db.data!.clients = db.data!.clients.filter((c) => c.id !== id);
  // reassign numbers
  clientData.numbers.forEach((list) => {
    const listData = getList(list.list);
    if (listData === undefined) return;
    listData.numbers = listData.numbers.concat(list.numbers);
    listData.numbers.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  });
  db.write();
}

function editClient(
  client: Client,
  numbersToRemove: string[],
  numbersToAdd: string[],
  listName: string
) {
  // The edit function removes the numbers from the client and reassigns them to the list, and vice versa
  const clientData = getClient(client.id);
  if (clientData === undefined) return;
  // remove numbers from client
  clientData.numbers = clientData.numbers.map((list) => {
    if (list.list === listName) {
      list.numbers = list.numbers.filter((n) => !numbersToRemove.includes(n));
    }
    return list;
  });
  // add numbers to client
  clientData.numbers = clientData.numbers.map((list) => {
    if (list.list === listName) {
      list.numbers = list.numbers.concat(numbersToAdd);
    }
    return list;
  });
  // remove numbers from list
  const listData = getList(listName);
  if (listData === undefined) return;
  listData.numbers = listData.numbers.filter((n) => !numbersToAdd.includes(n));
  // add numbers to list
  listData.numbers = listData.numbers.concat(numbersToRemove);
  // sort numbers
  listData.numbers.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  db.write();
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

function getListKeys() {
  return getLists().map((list) => list.list);
}

function removeList(name: string) {
  // The delete function removes the list and deletes the numbers from the clients
  const listData = getList(name);
  if (listData === undefined) {
    throw new Error('la lista no existe');
  };
  // remove list
  db.data!.numbers = db.data!.numbers.filter((list) => list.list !== name);
  // remove numbers from clients
  db.data!.clients.forEach((client) => {
    client.numbers = client.numbers.filter((list) => list.list !== name);
  });
  db.write();
}

if (window.db === undefined) {
  window.db = {
    addClient: addClient,
    getClient: getClient,
    deleteClient: deleteClient,
    editClient: editClient,
    createList: createList,
    getLists: getLists,
    getList: getList,
    getListKeys: getListKeys,
    removeList: removeList,
    getClients: getClients,
    setData: setData,
    getData: getData
  };
}
