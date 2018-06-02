const express = require('express');
const path = require('path');
const routes = require('./routes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');
const expressHandlebars = require('express-handlebars');
const moment = require('moment');

module.exports = (app) => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({'extended': true}));
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));

	// routes: Módulo responsável pela configuração das rotas
	routes(app);

	app.use('/public/', express.static(path.join(__dirname, '../public')));

	if ('development' == app.get('env'))
		app.use(errorHandler());

	app.engine('handlebars', expressHandlebars.create({
		defaultLayout: 'main',
		layoutsDir: `${app.get('views')}/layouts`,
		partialsDir: [`${app.get('views')}/partials`],
		helpers: {
			timeago: (timestamp) => {
				return moment(timestamp).startOf('minute').fromNow();
			}
		}
	}).engine);

	app.set('view engine', 'handlebars');

	return app;
};