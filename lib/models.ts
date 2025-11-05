import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin', 'creator'], default: 'user', required: false },
	premium: Boolean,
	avatar: String,
	banner: String,
});

const AccountModel = mongoose.model('user', AccountSchema);

export default AccountModel;
