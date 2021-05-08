// app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products

var app = express();

//middleware
const mongoose = require('mongoose');
//let dev_db_url = 'mongodb://root:admin1234@ds129233.mlab.com:29233/productstutorial';
let dev_db_url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure the app to use bodyParser()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', product);
let port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
