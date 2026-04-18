import mongoose, { Schema, models } from "mongoose";

const NewsSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: "" },
  author: { type: String, default: "Craft Verse Team" },
  tags: [{ type: String }],
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default models.News || mongoose.model("News", NewsSchema);
