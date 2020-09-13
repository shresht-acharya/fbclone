const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Posts_PATH = path.join('/uploads/posts');




const postSchema = new mongoose.Schema({
    content:{
        type : String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //include the array of id's of all comments in thsi post schema
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'  
        }
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    dislike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dislike'
        }
    ]
},{
    timestamps : true
});



const Post = mongoose.model('Post', postSchema);
module.exports = Post;