module.exports = {

	index(req, res) {
		res.render('image');
	},
	
	create(req, res) {
		res.send('POST image:create');
	},

	like(req, res) {
		res.send(`POST image:like ${req.params.image_id}`);
	},

	comment(req, res) {
		res.send(`POST image:comment ${req.params.image_id}`);
	}

};