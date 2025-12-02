// lib/db.ts
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URL!;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGO_URL) {
	throw new Error('❌ Missing MONGO_URL env variable');
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export async function connectToDB() {
	const client = await clientPromise;
	return client.db();
}


const MONGODB_URL = process.env.MONGO_URL as string;

if (!process.env.MONGO_URL) throw Error('Please define MONGODB_URI in .env');

let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}
export async function connectDB() {
	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URL, {
			dbName: 'animes',
			bufferCommands: false,
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
