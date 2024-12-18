import Stripe from "stripe";
import { Order } from "../models/Order.js";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const makePaymentInstance = async (req, res) => {
  try {
    const { user, city, postalcode, streetAddress, country, cart } = req.body;
    let line_items = [];
    cart.map((prod) =>
      line_items.push({
        quantity: prod.quantity,
        price_data: {
          currency: "INR",
          product_data: { name: prod.product.productName },
          unit_amount: prod.product.price * 100,
        },
      })
    );
    const prodIds = cart.map((val) => ({
      product: val.product._id,
      quantity: val.quantity,
    }));
    const amount = cart.reduce(
      (sum, product) => sum + product.product.price * product.quantity,
      0
    );
    const orderCreate = await Order.create({
      products: prodIds,
      customer: user._id,
      streetAddress,
      city,
      postalcode,
      country,
      paid: false,
      totalAmount: amount,
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: user.email,
      success_url: process.env.CLIENTHOST + "/orderSuccess/" + orderCreate._id,
      cancel_url: process.env.CLIENTHOST + "/orderFailed",
      metadata: { orderId: orderCreate._id.toString() },
    });
    return res.status(201).json(session.url);
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }

  //   const newOrder = await order;
};

export const getOrders = async (req, res) => {
  try {
    const getDb = await Order.find({});
    if (getDb) {
      return res.status(201).json(getDb);
    } else {
      return res.status(401).json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(false);
  }
};
