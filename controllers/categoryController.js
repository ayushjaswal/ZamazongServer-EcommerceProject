import { Category } from "../models/Category.js";

export const newCategory = async (req, res) => {
  try {
    const data = req.body;
    const properties = data?.Properties?.map((property) => ({
      ...property,
      propertyValue: !property.parent
        ? property.propertyValue.split(",")
        : property.propertyValue,
    }));
    data.Properties = properties;
    const dbResponse = await Category.create(data);
    if (dbResponse) {
      return res.status(201).json(dbResponse);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("ParentCategory");
    if (categories) {
      return res.status(201).json(categories);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.findOne({ _id: id }).populate(
      "ParentCategory"
    );
    if (categories) {
      return res.status(201).json(categories);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.deleteOne({ _id: id });

    if (categories) {
      return res.status(201).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const data = req.body;
    const properties = data?.Properties?.map((property) => ({
      ...property,
      propertyValue: typeof property.propertyValue === "string"
        ? property.propertyValue.split(",")
        : property.propertyValue,
    }));
    data.Properties = properties;
    const categories = await Category.updateOne({ _id: data._id }, data);

    if (categories) {
      return res.status(201).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
