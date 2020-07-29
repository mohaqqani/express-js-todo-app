import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userName: String, // username and email are considered same
    password: String,
    isActive: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Users', Schema);
