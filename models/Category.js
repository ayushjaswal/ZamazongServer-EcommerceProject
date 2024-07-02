import mongoose, { Schema, modelNames, model } from "mongoose";

const CategorySchema = new Schema({
  CategoryName: { type: String, required: true },
  ParentCategory: { type: mongoose.Types.ObjectId, ref: "Category", default: null },
  Properties: [{ type: Object }],
});

export const Category = modelNames?.Category || model("Category", CategorySchema);
