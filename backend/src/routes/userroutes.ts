import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  aboutUser,
} from "../controllers/userControllers";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(aboutUser);

export default router;
