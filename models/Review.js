import mongoose, { model, mongo, Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    comment: { type: String },
    images: [{ type: Object }],
    stars: { type: Number },
  },
  { timestamps: true }
);

const review = model("review", reviewSchema);

export default review;
