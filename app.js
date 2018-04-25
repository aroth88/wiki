const express = require('express');
const app = express();
const volleyball = require('volleyball');
const bodyparser = require('body-parser')
const nunjucks = require('nunjucks')
const Sequelize = require('sequelize');
const pg = require('pg');
const models = require('./models/index.js');
const routes = require('./routes');
const Prmoise = require('bluebird');

var staticMiddleware = express.static(__dirname + '/public')
app.use(staticMiddleware);
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(routes);
//this drops all tables then recreates them based on our JS definitions
models.db.sync({force: false})
	.then(() => {
        console.log('All tables created!');
		app.listen(3000, () =>console.log('listening on port 3000'));
	})
	.catch(console.error.bind(console));


