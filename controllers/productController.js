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
    const dbFind = await Product.find({});
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
    const dbFind = await Product.findOne({ _id: id });
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
