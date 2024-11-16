import mongoose, { Schema, Document, Model, Types } from "mongoose";

const contentTypes = ["image", "video", "article", "audio"] as const;

// Define a TypeScript type for content types
type ContentType = (typeof contentTypes)[number];

// Define an interface for the Content document
interface IContent extends Document {
    link: string;
    type: ContentType;
    title?: string; // Made optional since `ref` doesn't mean it's required
    tags: Types.ObjectId;
    userId: Types.ObjectId;
}

// Define the Content schema
const contentSchema: Schema<IContent> = new Schema(
    {
        link: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: contentTypes,
            required: true,
        },
        title: {
            type: String,
            ref: "Tag",
        },
        tags: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Tag", // Assuming tags refer to a Tag model
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User", // Assuming userId refers to a User model
        },
    },
    { timestamps: true }
);

// Define the Content model
const Content: Model<IContent> = mongoose.model<IContent>(
    "Content",
    contentSchema
);

export default Content;
