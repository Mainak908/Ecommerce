import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export interface UserAccDocument extends Document {
  name: string;
  email: string;
  password: string;
  products: [string];
  resetPasswordToken?: string | null;
  resetPasswordExpire?: Date | null;
  role: string;
  createdAt: Date;
  getJWTToken(): string;
  getResetPasswordToken(password: string): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserAccDocument>({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password Should be more than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "nuser",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      type: String,
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre<UserAccDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string);
};
// comparePassword
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function (password: string) {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model<UserAccDocument>("Useracc", userSchema);
