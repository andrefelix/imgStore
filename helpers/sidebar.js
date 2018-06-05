const stats = require('./stats');
const images = require('./images');
const comments = require('./comments');

module.exports = (viewModel, callback) => {

	
	viewModel.sidebar = {
		stats: stats(),
		popular: images.popular(),
		comments: comments.newest()
	};

	callback(viewModel);
};