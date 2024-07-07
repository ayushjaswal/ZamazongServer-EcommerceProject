import mongoose, { Schema, modelNames, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    customer: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    city: { type: String, required: true },
    streetAddress: { type: String, required: true },
    country: { type: String, required: true },
    postalcode: { type: String, required: true },
    paid: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Order = modelNames?.Order || model("Order", orderSchema);
