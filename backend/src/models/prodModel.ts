import { Document, Schema, model } from "mongoose";

export interface ProductImage {
  public_id: string;
  url: string;
}
export interface Review {
  user: Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}
export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: ProductImage[];
  category: string;
  reviews: Review[];
  numOfReviews: number;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  stock: number;
  qty: number;
}

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, "Please enter Product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter Product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product price"],
    maxlength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Please enter Product Stock"],
    maxlength: [4, "Stock cannot exceed characters"],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  qty: {
    type: Number,
    default: 1,
  },
});

const ProductModel = model<Product>("Product", productSchema);

export default ProductModel;
