import express from "express";

import {
  createProduct,
  fetchproduct,
  singleproduct,
} from "../controllers/prodControllers";

const router = express.Router();

router.route("/register-product").post(createProduct);
router.route("/fetch-product").get(fetchproduct);
router.route("/single-product/:id").get(singleproduct);

export default router;
