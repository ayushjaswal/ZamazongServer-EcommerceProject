import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import {
  deleteCategory,
  getCategories,
  getCategory,
  newCategory,
  updateCategory,
} from "../controllers/categoryController.js";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post("/new-category", newCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.delete("/delete-category/:id", deleteCategory);
router.post("/update-category", updateCategory);
export default router;
