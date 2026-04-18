import mongoose, { Schema, models } from "mongoose";

const CustomRequestSchema = new Schema({
  type: { type: String, enum: ["model", "clothes", "3d-printing"], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number },
  fileUrl: { type: String },
  status: {
    type: String,
    enum: ["pending", "reviewing", "accepted", "rejected", "completed"],
    default: "pending",
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  phone: { type: String },
}, { timestamps: true });

export default models.CustomRequest || mongoose.model("CustomRequest", CustomRequestSchema);
