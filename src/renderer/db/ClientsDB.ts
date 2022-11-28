import PouchDB from 'pouchdb';
import { Client } from 'types/Client';

const clientsDB = new PouchDB<Client>('clients');

export function addClient(client: Omit<Client, "_id" | "_rev">): Promise<PouchDB.Core.Response> {
  try {
    return clientsDB.put<Client>(client as Client);
  } catch (error) {
    throw new Error("Error adding client");
  }
}

export async function getClients(): Promise<PouchDB.Core.AllDocsResponse<Client>> {
  try {
    return await clientsDB.allDocs({ include_docs: true });
  } catch (error) {
    throw error;
  }
}

export async function getClient(id: string): Promise<Client> {
  try {
    return await clientsDB.get(id);
  } catch (error) {
    throw new Error("Couldn't get client");
  }
}

export async function updateClient(client: Omit<Client, "_rev">): Promise<PouchDB.Core.Response> {
  if (client._id === undefined) {
    throw new Error("Client must have an id");
  }
  try {
    const prevClient = await getClient(client._id);
    return await clientsDB.put({ ...client, _rev: prevClient._rev });
  } catch (error) {
    throw new Error("Client not found");
  }
}

export async function deleteClient(client: Client): Promise<PouchDB.Core.Response> {
  if (client._id === undefined) {
    throw new Error("Client must have an id");
  }
  if (client._rev === undefined) {
    throw new Error("Client must have a revision");
  }
  try {
    const currClient = await getClient(client._id);
    return clientsDB.remove(currClient);
  } catch (error) {
    throw new Error("Client not found");
  }
}

export async function clearClients(): Promise<void> {
  try {
    const clients = await getClients();
    clients.rows.forEach(async (client) => {
      await deleteClient(client.doc!);
    });
  } catch (error) {
    throw new Error("Couldn't clear clients");
  }
}

export async function NUKE_CLIENTS_DB(): Promise<void> {
  try {
    await clientsDB.destroy();
  } catch (error) {
    console.error("Couldn't destroy clients db");
    console.warn("Trying hard destroy");
    try {
      indexedDB.databases().then((dbs) => {
        dbs.forEach((db) => {
          indexedDB.deleteDatabase(db.name!);
        });
      })
    } catch (error) {
      console.error("Couldn't hard destroy clients db");
    }
  }
}
