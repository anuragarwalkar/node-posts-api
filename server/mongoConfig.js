const mongoose = require('mongoose');
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://anurag:${password}@cluster0-mbclo.gcp.mongodb.net/posts?retryWrites=true&w=majority`,{ useUnifiedTopology: true,useNewUrlParser: true,}).then(connection=>{
    console.log('mongoDb:',connection.connection.host)
}).catch(err=>{
    console.log('err:', err)
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
