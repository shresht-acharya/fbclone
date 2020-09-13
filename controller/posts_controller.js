const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Like = require('../models/like');
const Dislike = require('../models/dislike');
const path = require('path');


module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

       
        return res.redirect('back');
    }catch(err){
           
            return;
    }
    
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findByIdAndDelete(req.params.id);


                    return res.redirect('back');
    }catch(err){
        return res.redirect('back');
    }

    
}    