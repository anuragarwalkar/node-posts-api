const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const imgStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let err = new Error('invalid mime type')
        if(isValid){
            err = null
        }
        cb(err,'./images')
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,`${name}-${Date.now()}.${ext}`)
    }
})

router.get('/',async (req,res)=>{
    const allPosts = await Post.find();
    res.send(allPosts);
});

router.post('/',multer({storage:imgStorage}).single('image'),async(req,res)=>{
    const url = `${req.protocol}://${req.get('host')}`;
    let postObj = {
        title:req.body.title,
        description:req.body.description,
    }
    if(req.file){
        postObj.imagePath = req.file != undefined ?`${url}/images/${req.file.filename}`:null

    }
    const newPost = new Post(postObj)
    const dbCourse = await newPost.save()
    res.send(dbCourse);
});

router.delete('/:id',async(req,res)=>{
    const deleteRes = await Post.deleteOne({_id:req.params.id});
    // const updateData = await Post.find();
    res.send(deleteRes);
})

router.patch('/:id',async(req,res)=>{
    const updatedPost = await Post.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
    res.send(updatedPost);
})


module.exports = router;