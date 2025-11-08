import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL as string;

if (!process.env.MONGO_URL) throw Error('Please define MONGODB_URI in .env');

let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}
export default async function connectDB() {
	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URL, {
			dbName: 'next_backend',
			bufferCommands: false,
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
