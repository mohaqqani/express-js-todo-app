import mongoose from 'mongoose';

// import utils and helpers
import FKUtils from '../utils/foreign-key-utils';

const Schema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    text: String,
    markDone: {
        type: Boolean,
        default: false
    },
    list : {
        type: mongoose.Schema.ObjectId,
        ref: 'TodoLists',
        validate: {
            // isAsync: true,
            validator: (v) => {
                return FKUtils(mongoose.model('TodoLists'), v);
            },
            message: "Todo List Dose not exists"
        }
    }
});


export default mongoose.model('TodoLists', Schema);
