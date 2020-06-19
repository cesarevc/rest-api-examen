'use strict'

//connection with MongoDB
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/schilleramericas';

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true})
.then(mongoose => console.log('mongodb successful connection, listening on port: 27017'))
.catch(err => console.log(err));


//server express
var app = require('./app');
var port = 3900;

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
});