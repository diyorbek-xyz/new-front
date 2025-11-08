import { model, models, Schema } from 'mongoose';

const AccountSchema = new Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		username: { type: String, required: true, unique: true, minlength: 4, maxlength: 20, validate: { validator: (val: string) => /^[a-zA-Z0-9._]+$/.test(val), message: 'Username can only contain letters, numbers, dots, and underscores.' } },
		password: { type: String, required: true },
		role: { type: String, enum: ['user', 'admin', 'creator'], default: 'user' },
		premium: Boolean,
		avatar: String,
		banner: String,
	},
	{ timestamps: true, versionKey: false },
);
const AccountModel = models.accounts || model('accounts', AccountSchema);
export { AccountModel };
