import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'  
    }
},
{ timestamps: true });

const Content = mongoose.model("Content", contentSchema);

export default Content;
