import express from "express";

import {
  createProduct,
  fetchproduct,
  paymentcheckout,
  singleproduct,
  singleproductSearch,
} from "../controllers/prodControllers";

const router = express.Router();

router.route("/register-product").post(createProduct);
router.route("/fetch-product").get(fetchproduct);
router.route("/single-product/:id").get(singleproduct);
router.route("/singleproductSearch/:query").get(singleproductSearch);
router.route("/paymentcheckout").post(paymentcheckout);

export default router;
