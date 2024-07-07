import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import { newReview, deleteReview } from "../controllers/reviewController.js";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post("/new-review", newReview);
router.delete("/delete/:id", deleteReview);

export default router;
