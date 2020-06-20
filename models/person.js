'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = Schema({
    Name: String,
    Age: Number,
    Sex: String,
    Code: String
});


module.exports = mongoose.model('Person', PersonSchema);