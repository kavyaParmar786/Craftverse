import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ["charts", "models", "3d-printing", "clothes"],
    required: true,
  },
  image: { type: String, default: "" },
  description: { type: String, required: true },
  stock: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default models.Product || mongoose.model("Product", ProductSchema);
