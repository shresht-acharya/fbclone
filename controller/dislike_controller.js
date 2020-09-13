const Dislike = require("../models/dislike");
const Post =  require("../models/post");
const Comment = require('../models/comment');


module.exports.toggleDislike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef&type=Post
        let dislikeable;
        let deleted = false;


        if (req.query.type == 'Post'){
            dislikeable = await Post.findById(req.query.id).populate('dislike');
        }else{
            dislikeable = await Comment.findById(req.query.id).populate('dislike');
        }


        // check if a like already exists
        let existingDislike = await Dislike.findOne({
            dislikeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingDislike){
            dislikeable.dislike.pull(existingDislike._id);
            dislikeable.save();

            existingDislike.remove();
            deleted = true;

        }else{
            // else make a new like

            let newDislike = await Dislike.create({
                user: req.user._id,
                dislikeable: req.query.id,
                onModel: req.query.type
            });

            dislikeable.like.push(newDislike._id);
            dislikeable.save();

        }

        return res.redirect('back');



    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}
