import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, //ід постів
        ref: 'Post' // на яку схему посилаються айдішники
    }]
}, {itmestamps: true}); // Показує дату створення

export default mongoose.model('User', UserSchema);