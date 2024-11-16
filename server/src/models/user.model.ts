import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
