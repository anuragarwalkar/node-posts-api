const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posts',{ useUnifiedTopology: true,useNewUrlParser: true,});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;