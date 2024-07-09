import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import user from "../models/User.js";
import { Order } from "../models/Order.js";

export const getLogin = async (req, res) => {
  try {
    if (req.cookies?.token) {
      const values = jwtDecode(req.cookies.token);
      const getDb = await user.findOne({ _id: values._id });
      if (getDb) {
        var loginToken = jwt.sign(
          {
            _id: getDb._id,
          },
          process.env.JWT_SECRET,
          {}
        );
        res.cookie("token", loginToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
      }
      return res.json(getDb);
    } else {
      return res.json(null);
    }
  } catch (err) {
    return res.json(err);
  }
};
export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (req.cookies?.token) {
      const values = jwtDecode(req.cookies.token);
      return res.json(values);
    }
    if (token) {
      const decodedToken = jwtDecode(token);
      const values = {
        email: decodedToken.email,
        name: decodedToken.name,
        profile: decodedToken.picture,
      };
      const existingUser = await user.findOne({ email: decodedToken.email });
      if (!existingUser) {
        const createUser = await user.create(values);
        if (createUser) {
          var loginToken = jwt.sign(
            {
              _id: createUser._id,
            },
            process.env.JWT_SECRET,
            {}
          );
          res.cookie("token", loginToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          });
          return res.status(201).json(createUser);
        } else {
          return res.status(401).json(false);
        }
      } else {
        var loginToken = jwt.sign(
          {
            _id: existingUser._id,
          },
          process.env.JWT_SECRET,
          {}
        );
        res.cookie("token", loginToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        return res.status(201).json(existingUser);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      // httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    if (!req.cookies?.token) {
      return res.status(201).json(true);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { email, product } = req.body;
    const userDb = await user.findOne({ email }).populate({
      path: "cart",
      populate: { path: "product" },
    });
    const cartItemIndex = userDb.cart.findIndex(
      (item) => item.product._id.toString() === product
    );

    if (cartItemIndex > -1) {
      userDb.cart[cartItemIndex].quantity += 1;
    } else {
      userDb.cart.push({
        product: product,
        quantity: 1,
      });
    }

    await userDb.save();

    await userDb.populate({ path: "cart", populate: { path: "product" } });
    if (userDb) {
      return res.status(201).json(userDb.cart);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { email, product } = req.body;

    const userData = await user.findOne({ email }).populate({
      path: "cart",
      populate: { path: "product" },
    });

    const productIndex = userData.cart.findIndex(
      (item) => item.product._id.toString() === product
    );

    if (productIndex === -1) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    let updatedCart;
    if (userData.cart[productIndex].quantity > 1) {
      userData.cart[productIndex].quantity--;
    } else {
      userData.cart = userData.cart.filter(
        (item) => item.product._id.toString() !== product
      );
    }

    // userData.cart = updatedCart;
    await userData.save();

    const populatedUser = await userData.populate({
      path: "cart",
      populate: { path: "product" },
    });

    return res.status(201).json(populatedUser.cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};

export const getCart = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { _id } = decodedToken;

    const getDB = await user
      .findOne({ _id: _id })
      .populate({ path: "cart", populate: { path: "product" } });

    if (getDB) {
      return res.status(200).json(getDB);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    const { orderid } = req.params;

    // Check if the token exists in cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode the token safely
    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { _id } = decodedToken;

    // Find the user by decoded token ID
    const getDb = await user.findOne({ _id });
    if (!getDb) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear the user's cart
    getDb.cart = [];
    await getDb.save();

    // Update the order status
    const updateOrder = await Order.updateOne({ _id: orderid }, { paid: true });

    // Check if the cart is empty and the order was updated
    if (getDb.cart.length === 0 && updateOrder.nModified > 0) {
      return res
        .status(200)
        .json({ message: "Cart cleared and order updated successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to clear cart or update order" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
