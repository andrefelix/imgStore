module.exports = {
	newest() {
		const comments = [
			{
				comment: 'Mulher linda, mulher formosa',
				name: 'André Félix',
				timestamp: Date.now(),
				image: {
					uniqueId: 2,
					filename: 'sample2.png',
				}
			},

			{
				comment: 'Queria ser ela, mas sou gorda',
				name: 'Andressa Chata',
				timestamp: Date.now(),
				image: {
					uniqueId: 1,
					filename: 'sample1.png',
				}
			},
		];

		return comments;
	}
};