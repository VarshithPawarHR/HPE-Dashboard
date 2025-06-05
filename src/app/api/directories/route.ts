import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL!;
const dbName = process.env.MONGO_DB!;
const collectionName = process.env.MONGO_COLLECTION!;

export async function GET() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const directories = await collection.distinct("directory");

    await client.close();
    return NextResponse.json({ directories });
  } catch (error) {
    console.error("Error fetching directories:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
