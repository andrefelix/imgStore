const Image = require('../models').Image;
const assert = require('assert');

module.exports = {
	
	popular: (callback) => {
		Image.find({}, {}, {limit: 5, sort: {likes: -1}}, (err, images) => {
			assert.equal(err, null);

			callback(null, images);
		});
	}
};