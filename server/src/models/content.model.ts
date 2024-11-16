import mongoose, { Types } from "mongoose";

const contentTypes = ['image','video','article','audio'];

const contentSchema = new mongoose.Schema({
    link: {
        type:String,
        required:true,
    },
    type: {
        type:String,
        enum: contentTypes,
        required:true,
    },
    title: {
        type:String,
        ref:'Tag',
    },
    tags: {
        type:Types.ObjectId,
        required:true,
    },
    userId: {
        type:Types.ObjectId,
        required:true,
    },
    
});

