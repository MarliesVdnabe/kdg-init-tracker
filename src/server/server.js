// Set up mongoose connection
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

var mongoose = require('mongoose');
var mongoDB = 'mongodb://initTrackerAdmin:Passw0rd@ds119070.mlab.com:19070/init_tracker';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const heroes = require('./routes/heroesRoutes');
const monsters = require('./routes/monstersRoutes');
// All of the routes will be prefixed with /api

app.use('/api', heroes);
app.use('/api', monsters);



app.listen(8080, () => {
	console.log('Server started!');
});
