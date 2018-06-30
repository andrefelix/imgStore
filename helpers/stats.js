const async = require('async');
const Models = require('../models');
const assert = require('assert');

module.exports = (callback) => {

	async.parallel([
		(next) => {
			Models.Image.count({}, (err, countValue) => {
				next(err, countValue);
			});
		},
		(next) => {
			Models.Comment.count({}, (err, countValue) => {
				next(err, countValue);
			});
		},
		(next) => {
			Models.Image.aggregate([
				{$match: {}},
				{$group: {_id: '1', totalViews: {$sum: '$views'}}}
			], (err, result) => {
				assert.equal(err, null);

				let totalViews = 0;

				if (result.length > 0)
					totalViews += result[0].totalViews;

				next(null, totalViews);
			});
		},
		(next) => {
			Models.Image.aggregate([
				{$match: {}},
				{$group: {_id: '1', totalLikes: {$sum: '$likes'}}}
			], (err, result) => {
				assert.equal(err, null);

				let totalLikes = 0;

				if (result.length > 0)
					totalLikes += result[0].totalLikes;

				next(null, totalLikes);
			});
		},
	], (err, results) => {
		assert.equal(err, null);

		const stats = {
			images: results[0],
			comments: results[1],
			views: results[2],
			likes: results[3]
		};

		callback(null, stats);
	});
	
		
};