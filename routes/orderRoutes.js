import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import { getOrders, makePaymentInstance } from "../controllers/orderController.js";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post("/order-payment", makePaymentInstance);
router.get("/", getOrders);

export default router;
