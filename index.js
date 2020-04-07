const app = require('./server/server');
const posts = require('./routes/posts');
const express = require('express');
const db = require('./server/mongoConfig');
const images = require('./middlewares/images')
// const cors = require('./middlewares/cors-mod');
const cors = require('cors');
//Middleware 
app.use(express.json());

// Custom made middleware
app.use(cors());


//All available routes
app.use('/api/posts',posts);
app.use('/images',images)

db.once('open', function() {
    console.log('connected to mongoDb')
},(err)=>{
    console.log(err)
});


