import { Product } from "../models/Products.js";

export const addNewProduct = async (req, res) => {
  try {
    const data = req.body;
    const dbCreate = await Product.create(data);
    if (dbCreate) {
      return res.status(201).json(dbCreate);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};

export const getProduct = async (req, res) => {
  try {
    const dbFind = await Product.find({}).populate({
      path: "review",
      populate: {
        path: "user",
      },
    });
    if (dbFind) {
      return res.status(201).json(dbFind);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const dbFind = await Product.findOne({ _id: id })
      .populate("category")
      .populate({
        path: "review",
        populate: {
          path: "user",
        },
      });
    if (dbFind) {
      return res.status(201).json(dbFind);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
export const getSearchProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const dbFind = await Product.find({
      productName: { $regex: name, $options: "i" },
    });
    if (dbFind) {
      return res.status(201).json(dbFind);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const dbFind = await Product.deleteOne({ _id: id });
    if (dbFind) {
      return res.status(201).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const dbFind = await Product.updateOne({ _id: data._id }, data);
    if (dbFind) {
      return res.status(201).json(dbFind);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
export const getFeatureProduct = async (req, res) => {
  try {
    const latestProduct = await Product.findOne({})
      .sort({ _id: -1 })
      .populate("category");
    if (latestProduct) {
      return res.status(200).json(latestProduct);
    } else {
      return res.status(404).json({ message: "No product found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
