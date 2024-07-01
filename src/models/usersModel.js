import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const key = "1234567";

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const userSchemaJoi = Joi.object({
    _id:Joi.required(),
    username: Joi.string().required().trim().lowercase(),
    fullname: Joi.string().required().trim().lowercase(),
    email: Joi.string().email().required(),
    avatar: Joi.string(),
    coverImage: Joi.string(),
    watchHistory: Joi.string(),
    role:Joi.string(),
    password: Joi.string()
        .required()
        .pattern(passwordPattern)
        .messages({
            'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
        }),
    refreshtoken: Joi.string(),
    createdAt: Joi.required(),

    updatedAt:Joi.required()
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            lowercase: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
        },
        coverImage: {
            type: String,
        },
        
        role:{
          type: String,
          required:true,
          default: "User"
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        refreshtoken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    try {
        await userSchemaJoi.validateAsync(this.toObject());
        if (!this.isModified("password")) return next();
        if (!passwordPattern.test(this.password)) {
            const error = new Error('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
            return next(error);
        }
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.iscorrect = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.genrateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullname: this.fullname,
            email: this.email,
        },
        key
    );
};

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        key
    );
};

export const Users = mongoose.model("Users", userSchema);
