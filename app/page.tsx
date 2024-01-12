import Link from "next/link";
import React from "react";
import { Btncmp } from "./clnt";
import Navbar from "@/components/navbar";
import { Product } from "@/backend/src/models/prodModel";
import { fetchUserData } from "./try";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <Link href={`/shop/${product.id}`}>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
        />
      </Link>
      <h2 className="text-xl font-semibold text-black">{product.name}</h2>
      <p className="text-gray-600">{product.price}</p>
      <Btncmp product={product} />
    </div>
  );
};

const FrontPage = async () => {
  const data = await fetchUserData<Product>(
    "http://localhost:3001/api/v1/fetch-product",
    "GET"
  );
  const products = data.resp;

  return (
    <div className="bg-gray-100">
      <Navbar products={products} />

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, id) => (
            <ProductCard key={id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FrontPage;
