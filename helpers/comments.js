const async = require('async');
const Models = require('../models');
const assert = require('assert');

module.exports = {
	newest: (callback) => {
		Models.Comment.find({}, {}, {limit: 3, sort: {timestamp: -1}}, (err, comments) => {
			assert.equal(err, null);

			const attachedImage = (comment, next) => {
				Models.Image.findOne({_id: comment.image_id}, (err, image) => {
					assert.equal(err, null);

					comment.image = image;
					next(null);
				});
			};

			async.each(comments, attachedImage, (err) => {
				assert.equal(err, null);

				callback(null, comments);
			});
 		});
	}
};