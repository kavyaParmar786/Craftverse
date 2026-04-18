import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number,
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },
}, { timestamps: true });

export default models.Order || mongoose.model("Order", OrderSchema);
