const express = require('express');
const configure = require('./server/configure');
const mongoose = require('mongoose');
let app = express();

// configure: módulo responsável pela configuração dos middewares
app = configure(app);

app.set('port', process.env.PORT || 3300);
app.set('views', `${__dirname}/views`);

const url = 'mongodb://localhost/imgStore';

mongoose.connect(url);

mongoose.connection.on('open', () => {
	console.log('Connected on MongoDB!');
});

app.listen(app.get('port'), () => {
	console.log(`Server up: http://localhost:${app.get('port')}`);
});