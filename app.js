// app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products

var app = express();

//middleware
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://root:admin1234@ds129233.mlab.com:29233/productstutorial';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use('/products', product);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
