module.exports = {

	// GET: /images/:image_id
	index(req, res) {
		const viewModel = {
			image: {
				uniqueId: 1,
				filename: 'sample4.png',
				title: 'Image 1 for sample',
				description: 'Morena baixa com corpão',
				likes: 0,
				views: 0,
				timestamp: Date.now()
			},

			comments: [
				{
					name: 'André Félix',
					comment: 'Essa moça parece ser bem nova',
					email: 'afelixfreitas@gmail.com',
					gravatar: 'http://lorempixel.com/75/75/animals/1',
					timestamp: Date.now()
				},

				{
					name: 'Andressa Félix',
					comment: 'Engordei, culpa do meu irmão',
					email: 'andressa@gmail.com',
					gravatar: 'http://lorempixel.com/75/75/animals/2',
					timestamp: Date.now()
				}
			]
		};

		res.render('image', viewModel);
	},
	
	create(req, res) {
		res.send('POST image:create');
	},

	like(req, res) {
		res.json({likes: 1});
	},

	comment(req, res) {
		res.send(`POST image:comment ${req.params.image_id}`);
	}

};