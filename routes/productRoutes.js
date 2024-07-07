import express from "express";
const router = express.Router();
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
import {
  addNewProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  getSearchProduct,
  getFeatureProduct,
} from "../controllers/productController.js";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.post("/new-product", addNewProduct);
router.get("/", getProduct);
router.get("/get-product/:id", getSingleProduct);
router.get("/search/:name", getSearchProduct);
router.delete("/:id", deleteProduct);
router.post("/edit-product", updateProduct);
router.get("/feature-product", getFeatureProduct);
export default router;
