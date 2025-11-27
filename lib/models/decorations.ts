import { model, models, Schema } from 'mongoose';

const DecorationsSchema = new Schema(
	{
		title: String,
		src: String,
	},
	{ versionKey: false },
);
const DecorationsModel = models.decorations || model('decorations', DecorationsSchema);

export { DecorationsModel };
