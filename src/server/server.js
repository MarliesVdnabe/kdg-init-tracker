// Set up mongoose connection
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
