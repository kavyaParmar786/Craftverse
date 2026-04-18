/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

// Bypass TS strict checks on Mongoose middleware
(UserSchema as any).pre("save", async function(this: any, next: any) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

(UserSchema as any).methods.comparePassword = function(candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export default models.User || mongoose.model("User", UserSchema);
