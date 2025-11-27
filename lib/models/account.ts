import mongoose, { model, models, Schema } from 'mongoose';

const AccountSchema = new Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		username: { type: String, required: true, unique: true, minlength: 4, maxlength: 20, validate: { validator: (val: string) => /^[a-zA-Z0-9._]+$/.test(val), message: 'Username can only contain letters, numbers, dots, and underscores.' } },
		password: { type: String, required: true },
		role: { type: String, enum: ['user', 'admin', 'creator'], default: 'user' },
		premium: Boolean,
		avatar: String,
		decoration: { type: mongoose.Types.ObjectId, ref: 'decorations' },
		banner: String,
	},
	{ timestamps: true, versionKey: false },
);
const AccountModel = models.account || model('account', AccountSchema);
export { AccountModel };
