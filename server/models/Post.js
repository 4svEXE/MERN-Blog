import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    username:{
        type: 'String',
        required: true,
    },
    title: {
        type: 'String',
        required: true,
    },
    text: {
        type: 'String',
        required: true
    },
    imgUrl: [{
        type: 'String',
        default: 'https://help-wifi.com/wp-content/uploads/2017/09/Not-Found.jpg'
    }],
    views: [{
        type: 'Number',
        default: 0
    }],
    uathors: [{
        type: mongoose.Schema.Types.ObjectId, //ід постів
        ref: 'User' // на яку схему посилаються айдішники
    }],
    coments: [{
        type: mongoose.Schema.Types.ObjectId, //ід постів
        ref: 'Comment' // на яку схему посилаються айдішники
    }]

}, {timestamps: true});

export default mongoose.model('Post', PostSchema);