const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
	image_id: { type: ObjectId },
	name: { type: String },
	email: { type: String },
	gravatar: { type: String },
	comment: { type: String },
	timestamp: { type: Date, default: Date.now }
});

commentSchema.virtual('image')
	.set(function(image) {
		this._image = image;
	})
	.get(function() {
		return this._image;
	});

module.exports = mongoose.model('Comment', commentSchema);