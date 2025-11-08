import mongoose, { model, models, Schema } from 'mongoose';

const MovieSchema = new Schema(
	{
		studio: String,
		name: { type: String, required: true },
		poster: { type: String, required: true },
		seasons: [{ type: mongoose.Types.ObjectId, ref: 'season' }],
	},
	{ timestamps: true, versionKey: false },
);
const SeasonSchema = new Schema(
	{
		movie: { type: mongoose.Types.ObjectId, ref: 'movie' },
		poster: { type: String, required: true },
		title: { type: String, required: true },
		season: { type: Number, required: true },
		episodes: [{ type: mongoose.Types.ObjectId, ref: 'episode' }],
	},
	{ timestamps: true, versionKey: false },
);
const EpisodeSchema = new Schema(
	{
		movie: { type: mongoose.Types.ObjectId, ref: 'movie' },
		seasons: { type: mongoose.Types.ObjectId, ref: 'season' },
		title: { type: String, required: true },
		episode: { type: Number, required: true },
		video: { type: String, required: true },
		previews: { type: String, required: true },
		download: { type: String, required: true },
	},
	{ timestamps: true, versionKey: false },
);
const MovieModel = models.Movie || model('movie', MovieSchema);
const SeasonModel = models.Season || model('season', SeasonSchema);
const EpisodeModel = models.Episode || model('episode', EpisodeSchema);

export { MovieModel, SeasonModel, EpisodeModel };
