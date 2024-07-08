import express from "express";
const router = express.Router();
import {
  addToCart,
  getCart,
  getLogin,
  login,
  logout,
  removeFromCart,
  clearUserCart
} from "../controllers/authController.js";
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get("/login", getLogin);
router.post("/login", login);
router.get("/logout", logout);
router.post("/addtocart", addToCart);
router.post("/removefromcart", removeFromCart);
router.get("/get-cart", getCart);
router.get("/clear-cart/:orderid", clearUserCart);
export default router;
