import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the Link document
interface ILink extends Document {
    hash: string;
    userId: mongoose.Types.ObjectId;
}

// Define the Link schema
const linkSchema: Schema<ILink> = new Schema(
    {
        hash: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Define the Link model
const Link: Model<ILink> = mongoose.model<ILink>("Link", linkSchema);

export default Link;
