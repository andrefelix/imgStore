module.exports = {

	index(req, res) {
		res.send(`GET image:index ${req.params.image_id}`);
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