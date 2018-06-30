const stats = require('./stats');
const images = require('./images');
const comments = require('./comments');
const async = require('async');
const assert = require('assert');

module.exports = (viewModel, callback) => {
	
	async.parallel([
		(next) => {
			stats(next)
		},
		(next) => {
			images.popular(next);
		},
		(next) => {
			comments.newest(next);
		},
	], (err, results) => {
		assert.equal(err, null);

		viewModel.sidebar = {
			stats: results[0],
			popular: results[1],
			comments: results[2]
		};

		callback(viewModel);
	});

		

	
};