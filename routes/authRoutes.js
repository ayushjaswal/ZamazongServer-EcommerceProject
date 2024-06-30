import express from "express";
const router = express.Router();
import { getLogin, login, logout } from "../controllers/authController.js";
import bodyParser from "body-parser";
const app = express();
import cookieParser from "cookie-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get("/login", getLogin);
router.post("/login", login);
router.get("/logout", logout);
export default router;
