import { Product } from "../models/Products.js";
import review from "../models/Review.js";
import user from "../models/User.js";

export const newReview = async (req, res) => {
  try {
    const data = req.body;
    const getUser = await user.findOne({ email: data.user.email });
    data.user = getUser._id;
    const dbCreate = await review.create(data);

    const populatedReview = await dbCreate.populate("user");
    const updateProduct = await Product.updateOne(
      { _id: data.product },
      { $push: { review: dbCreate._id }, $inc: { reviewValue: data.stars } }
    );
    if (populatedReview) {
      return res.status(201).json(populatedReview);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const getDb = await review.findOne({ _id: id });
    console.log(getDb)
    if (getDb) {
      const deleteProdRev = await Product.updateOne(
        { _id: getDb.product },
        { $pull: { review: id }, $inc: { reviewValue: -getDb.stars } }
      );
    }
    const deleteDb = await review.deleteOne({ _id: id });
    if (deleteDb) {
      return res.status(201).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
