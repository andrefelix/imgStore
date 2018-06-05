module.exports = {

	// GET: '/'
	index(req, res) {
		const viewModel = {
			images: [
				{
					uniqueId: 1,
					filename: 'sample1.png',
					title: 'Image 1 for sample',
				},

				{
					uniqueId: 2,
					filename: 'sample2.png',
					title: 'Image 2 for sample',
				},

				{
					uniqueId: 3,
					filename: 'sample3.png',
					title: 'Image 3 for sample',
				},

				{
					uniqueId: 4,
					filename: 'sample4.png',
					title: 'Image 4 for sample',
				}
			]
		};

		res.render('home', viewModel);
	}

};