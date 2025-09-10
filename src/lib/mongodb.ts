import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string | undefined;
const dbName = process.env.MONGODB_DB as string | undefined;

if (!uri) { console.warn('MONGODB_URI not set. Set it in .env.local to enable database access.'); }
if (!dbName) { console.warn('MONGODB_DB not set. Set it in .env.local to enable database access.'); }

let client: MongoClient | null = null;
let _db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (_db) return _db;
  if (!uri || !dbName) throw new Error('MongoDB env vars missing');
  if (!client) {
    client = new MongoClient(uri, { maxPoolSize: 10 });
  }
  // If not yet connected, connect. Driver manages pooling.
  // Attempt a lightweight ping; if it throws, reconnect
  try {
    await client.db(dbName).command({ ping: 1 });
  } catch {
    await client.connect();
  }
  _db = client.db(dbName);
  return _db;
}

export async function closeDb() {
  if (client) await client.close();
  client = null; _db = null;
}

export type WithTimestamps<T> = T & { createdAt?: Date; updatedAt?: Date };