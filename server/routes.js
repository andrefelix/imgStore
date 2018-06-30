const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
const path = require('path');
const multer = require('multer');
const upload = multer({dest: path.join(__dirname, '../public/upload/temp')});

module.exports = (app) => {
	router.get('/', home.index);
	router.get('/images/:image_id', image.index);
	router.post('/images', upload.any(), image.create);
	router.post('/images/:image_id/like', image.like);
	router.post('/images/:image_id/comment', image.comment);
	router.delete('/images/:image_id', image.remove);

	app.use(router);
};