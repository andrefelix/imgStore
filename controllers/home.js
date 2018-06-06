const sidebar = require('../helpers/sidebar');

module.exports = {

	// GET: '/'
	index(req, res) {
		const viewModel = {
			images: [
				{
					uniqueId: 'sample1.png',
					filename: 'sample1.png',
					title: 'Image 1 for sample',
				},

				{
					uniqueId: 'sample2.png',
					filename: 'sample2.png',
					title: 'Image 2 for sample',
				},

				{
					uniqueId: 'sample3.png',
					filename: 'sample3.png',
					title: 'Image 3 for sample',
				},

				{
					uniqueId: 'sample4.png',
					filename: 'sample4.png',
					title: 'Image 4 for sample',
				}
			]
		};

		sidebar(viewModel, (viewModel) => {
			res.render('home', viewModel);
		});
	}

};