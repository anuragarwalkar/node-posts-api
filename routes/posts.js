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
        postObj.imagePath = req.file != undefined ?`${url}/images/${req.file.filename}`:null;

    }
    const newPost = new Post(postObj);
    const dbCourse = await newPost.save();
    req.io.emit('post-add', dbCourse);
    res.status(201).send({success:true,message:'post added.'});
});

router.delete('/:postGuid',async(req,res)=>{
    const { postGuid } = req.params;
    const deleteRes = await Post.deleteOne({_id:postGuid});
    req.io.emit('post-delete', postGuid);
    res.send({success:true, message:'post deleted.'});
})

router.patch('/:id',async(req,res)=>{
    const updatedPost = await Post.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
    req.io.emit('post-update', updatedPost);
    res.send({success:true, message:'post updated.'});
})


module.exports = router;