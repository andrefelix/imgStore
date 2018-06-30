const sidebar = require('../helpers/sidebar');
const Image = require('../models').Image;
const assert = require('assert');

module.exports = {

	// GET: '/'
	index(req, res) {
		
		const viewModel = {
			images: []
		};

		Image.find({}, {}, {limit: 5, sort: {timestamp: -1}}, (err, images) => {
			assert.equal(err, null);

			viewModel.images = images;

			sidebar(viewModel, (viewModel) => {
				res.render('home', viewModel);
			});
		});
	}

};