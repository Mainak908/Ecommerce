import mongoose from "mongoose";
import catchAsyncError from "../middleware/catchAsyncError";
import ProductModel, { Product } from "../models/prodModel";
const stripe = require("stripe")(
  "sk_test_51O07tpSC4QlQZ4KyrCd9LGT12U8SdgacO7maOpxaRcPTYrkBO2CSxkna2zbJwSpdvFdJagWDvB9hoW7mZbnhkv4r00pyZ27k99"
);

export const createProduct = catchAsyncError(async (req, res, next) => {
  const resp = await ProductModel.create(req.body);

  res.status(200).json({
    success: true,
    resp,
  });
});

export const fetchproduct = catchAsyncError(async (req, res, next) => {
  const resp = await ProductModel.find({});
  res.status(200).json({
    success: true,
    resp,
  });
});

export const singleproduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const resp = await ProductModel.findById(id);
  res.status(200).json({
    success: true,
    resp,
  });
});

export const singleproductSearch = catchAsyncError(async (req, res, next) => {
  const { query } = req.params;
  const resp = await ProductModel.find({
    $or: [
      {
        name: {
          $regex: new RegExp(query, "i"),
        },
      },
      {
        description: {
          $regex: new RegExp(query, "i"),
        },
      },
    ],
  });
  res.status(200).json({
    success: true,
    resp,
  });
});

export const checkoutproduct = catchAsyncError(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productsToBuy = req.body.products; // An array of product objects { _id, quantity }

    for (const { _id, quantity } of productsToBuy) {
      const product = await ProductModel.findById(_id).session(session);

      if (!product || product.stock < quantity) {
        throw new Error(`Product with ID ${_id} is out of stock`);
      }

      // Reduce stock for each product
      product.stock -= quantity;
      await product.save();
    }

    await session.commitTransaction();
    return res.status(200).send("Checkout successful");
  } catch (error) {
    console.error("Error during checkout:", error);
    await session.abortTransaction();
    return res.status(500).send("Internal server error");
  } finally {
    session.endSession();
  }
});

export const paymentcheckout = catchAsyncError(async (req, res, next) => {
  const { products } = req.body;
  const listItems = products.map((product: Product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.images[0].url],
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [listItems],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/failed",
  });
  res.json({ url: session.url });
});
