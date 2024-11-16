import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Tag document
interface ITag extends Document {
    title: string;
}

// Define the Tag schema
const tagSchema: Schema<ITag> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
});

// Define the Tag model
const Tag: Model<ITag> = mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
