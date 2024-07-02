import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import {
  deleteCategory,
  getCategories,
  newCategory,
} from "../controllers/categoryController.js";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post("/new-category", newCategory);
router.get("/", getCategories);
router.delete("/delete-category/:id", deleteCategory);
export default router;
