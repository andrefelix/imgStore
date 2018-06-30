const sidebar = require('../helpers/sidebar');
const path = require('path');
const fs = require('fs');
const Models = require('../models');
const md5 = require('md5');
const assert = require('assert');

module.exports = {

	// GET: '/images/:image_id'
	index: (req, res) => {

		let viewModel = {
			image: {},
			comments: []
		};

		const image_id = req.params.image_id;

		Models.Image.findOne({filename: {$regex: image_id}}, (err, image) => {
			assert.equal(err, null);

			if (image) {
				image.views += 1;
				viewModel.image = image;
				image.save();

				Models.Comment.find({image_id: image._id}, (err, comments) => {
					assert.equal(err, null);

					viewModel.comments = comments;

					sidebar(viewModel, (viewModel) => {
						res.render('image', viewModel);
					});
				});
			}
			else
				res.redirect('/');
		});			
	},
	
	// POST: '/images'
	create: (req, res) => {
		const saveImage = () => {
			const possible = 'abcdefghijklmnopqrstuvwyxz0123456789';
			let imgUrl = '';

			for (let i = 0; i < 6; i++)
				imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));


			Models.Image.findOne({filename: {$regex: imgUrl}}, (err, image) => {
				assert.equal(err, null);

				if (image)
					saveImage();
				else {
					const file = req.files[0];
					const mimetype = file.mimetype.split('/');
					const ext = mimetype[1];
					const tempPath = file.path;
					const imgName = imgUrl + '.' + ext;
					const targetPath = path.resolve(`./public/upload/${imgName}`);
					const allowedExt = ['png', 'jpg', 'jpeg', 'gif'];

					const unlink = (path, errorMsg) => {
						fs.unlink(path, (err) => {
							assert.equal(err, null);
							res.status(500).json();
						});
					};

					let errorMsg = {};

					if (allowedExt.indexOf(ext) > -1) {
						fs.rename(tempPath, targetPath, (err) => {
							assert.equal(err, null);

							const newImg = new Models.Image(req.body);
							newImg.filename = imgName;

							newImg.save((err, image) => {
								if (!err)
									res.redirect('/images/' + image.uniqueId);
								else {
									errorMsg.error = 'Error when process save in DB.';
									unlink(targetPath, errorMsg);
								}
							});
						});
					}
					else {
						errorMsg.error = 'Only image files are allowed.';
						unlink(tempPath, errorMsg);
					}
				}
			});
		};

		saveImage();
	},

	// POST: '/images/:image_id/like'
	like: (req, res) => {

		const image_id = req.params.image_id;

		Models.Image.findOne({filename: {$regex: image_id}}, (err, image) => {
			assert.equal(err, null);

			if (image) {
				image.likes += 1;
				image.save((err) => {
					assert.equal(err, null);

					res.json({likes: image.likes});
				});
			}
		});
	},

	// POST: '/images/:image_id/comment'
	comment: (req, res) => {
		const image_id = req.params.image_id;

		Models.Image.findOne({filename: {$regex: image_id}}, (err, image) => {
			assert.equal(err, null);

			if (image) {
				const newComment = new Models.Comment(req.body);
				newComment.gravatar = md5(req.body.email);
				newComment.image_id = image._id;

				newComment.save((err, comment) => {
					assert.equal(err, null);

					res.redirect('/images/' + image_id + '#' + comment._id);
				});
			}
		});
	},

	// DELETE: '/images/:image_id'	
	remove: (req, res) => {
		const image_id = req.params.image_id;

		Models.Image.findOne({filename: {$regex: image_id}}, (err, image) => {
			assert.equal(err, null);

			if (image) {
				const imagePath = path.resolve('./public/upload/' + image.filename);
				
				fs.unlink(imagePath, (err) => {
					Models.Comment.remove({image_id: image._id}, (err) => {
						assert.equal(err, null);

						image.remove((err) => {
							if (!err)
								res.json(true);
							else
								res.json(false);
						});
					});
				});
			}
		});
	}

};