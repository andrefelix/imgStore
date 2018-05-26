const express = require('express');
const configure = require('./server/configure');
let app = express();

// configure: módulo responsável pela configuração dos middewares
app = configure(app);

app.set('port', process.env.PORT || 3300);
app.set('views', `${__dirname}/views`);

app.listen(app.get('port'), () => {
	console.log(`Server up: http://localhost:${app.get('port')}`);
});