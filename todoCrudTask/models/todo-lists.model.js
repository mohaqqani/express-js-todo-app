import mongoose from 'mongoose';

// import utils and helpers
import FKUtils from '../utils/foreign-key-utils';

const Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: String,
    isActive: {
        type: Boolean,
        default: true
    },
    type: String, // Collaborative or Personal,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        validate: {
            // isAsync: true,
            validator: (v) => {
                return FKUtils(mongoose.model('Users'), v);
            },
            message: "User Dose not exists"
        }
    },
    contributors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        validate: {
            // isAsync: true,
            validator: (v) => {
                return FKUtils(mongoose.model('Users'), v);
            },
            message: "User Dose not exists"
        }
    }]
});

export default mongoose.model('TodoLists', Schema);
