const mongoose = require('mongoose');


const dislikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the disliked object
    dislikeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the disliked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});


const Dislike = mongoose.model('Dislike', dislikeSchema);
module.exports = Dislike;