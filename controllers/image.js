const sidebar = require('../helpers/sidebar');
const path = require('path');
const fs = require('fs');

module.exports = {

	// GET: '/images/:image_id'
	index(req, res) {
		const imgId = req.params.image_id;

		const viewModel = {
			image: {
				uniqueId: imgId,
				filename: imgId,
				title: 'Image 1 for sample',
				description: 'Morena baixa com corpão',
				likes: 0,
				views: 0,
				timestamp: Date.now()
			},
			comments: [
				{
					image_id: imgId,
					name: 'André Félix',
					comment: 'Essa moça parece ser bem nova',
					email: 'afelixfreitas@gmail.com',
					gravatar: 'http://lorempixel.com/75/75/animals/1',
					timestamp: Date.now()
				},

				{
					image_id: imgId,
					name: 'Andressa Félix',
					comment: 'Engordei, culpa do meu irmão',
					email: 'andressa@gmail.com',
					gravatar: 'http://lorempixel.com/75/75/animals/2',
					timestamp: Date.now()
				}
			]
		};

		sidebar(viewModel, (viewModel) => {
			res.render('image', viewModel);
		});
	},
	
	// POST: '/images'
	create(req, res) {
		const saveImage = () => {
			const possible = 'abcdefghijklmnopqrstuvwyxz0123456789';
			let imgUrl = '';

			for (let i = 0; i < 6; i++)
				imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));

			const file = req.files[0];
			const mimetype = file.mimetype.split('/');
			const ext = mimetype[1];
			const tempPath = file.path;
			const imgName = imgUrl + '.' + ext;
			const targetPath = path.resolve(`./public/upload/${imgName}`);
			const allowedExt = ['png', 'jpg', 'jpeg', 'gif'];

			if (allowedExt.indexOf(ext) > -1) {
				fs.rename(tempPath, targetPath, (err) => {
					if (err) throw err;

					res.redirect('/images/' + imgName);
				});
			}
			else {
				fs.unlink(tempPath, (err) => {
					if (err) throw err;

					res.status(500).json({'error': 'Only image files are allowed.'});
				});
			}
		};

		saveImage();
	},

	// POST: '/images/:image_id/like'
	like(req, res) {
		res.json({likes: 1});
	},

	// POST: '/images/:imgae_id/comment'
	comment(req, res) {
		res.send(`POST image:comment ${req.params.image_id}`);
	}

};