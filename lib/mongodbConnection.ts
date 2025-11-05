import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL;
async function connectMongoDB() {
	try {
		if (MONGODB_URL) {
			await mongoose.connect(MONGODB_URL, { dbName: 'nextjs-backend' });
			console.info('Connected MongoDB.');
		} else {
			console.error("MONGODB_URL can't found");
		}
	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
}
export default connectMongoDB;
