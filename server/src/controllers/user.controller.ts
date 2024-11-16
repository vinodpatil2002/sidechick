import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Type for JWT Payload
interface JwtPayload {
    id: string;
}

// Sign up Controller
export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Error creating user" });
    }
};

// Sign in Controller
export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Check if the password is correct
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET as string
        );
        const { password: pass, ...rest } = validUser.toObject(); // Use `toObject()` to get plain JS object

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Sign out Controller
export const signout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("access_token")
            .status(200)
            .json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
