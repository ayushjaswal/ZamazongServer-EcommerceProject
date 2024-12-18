import mongoose, { Schema, model, modelNames } from "mongoose";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: Object,
      },
    ],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    properties: [
      {
        type: Object,
      },
    ],
    review: [{ type: mongoose.Types.ObjectId, ref: "review", default: [] }],
    reviewValue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = modelNames?.Product || model("Product", ProductSchema);
