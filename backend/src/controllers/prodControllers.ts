import catchAsyncError from "../middleware/catchAsyncError";
import Product from "../models/prodModel";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const resp = await Product.create(req.body);

  res.status(200).json({
    success: true,
    resp,
  });
});

export const fetchproduct = catchAsyncError(async (req, res, next) => {
  const resp = await Product.find({});
  res.status(200).json({
    success: true,
    resp,
  });
});

export const singleproduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const resp = await Product.findById(id);
  res.status(200).json({
    success: true,
    resp,
  });
});

export const singleproductSearch = catchAsyncError(async (req, res, next) => {
  const { query } = req.params;
  const resp = await Product.find({
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
