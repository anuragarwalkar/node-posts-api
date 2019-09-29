const app = require('./server/server');
const posts = require('./routes/posts');
const express = require('express');
const db = require('./server/mongoConfig');
const cors = require('cors');

//Middleware 
app.use(express.json());
app.use(cors());

//All available routes
app.use('/api/posts',posts);

db.once('open', function() {
    console.log('connected to db')
});


