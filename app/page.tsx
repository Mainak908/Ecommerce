import React from "react";
import Link from "next/link";
import FrontPage, { Btncmp } from "./clnt";
import { Product } from "@/backend/src/models/prodModel";
import { fetchUserData } from "./try";
import FlipkartNavbar from "./components/typesModel";
import FlipkartBanner from "./components/slidingBannar";

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
const Serverc = async () => {
  const data = await fetchUserData<Product>(
    "http://localhost:3001/api/v1/fetch-product",
    "GET"
  );
  const products = data.resp;
  return (
    <div className=" bg-zinc-200">
      <FrontPage />
      <div className=" lg:max-w-screen-2xl lg:mx-auto flex flex-col gap-6 ">
        <FlipkartNavbar />
        <FlipkartBanner />
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-4">Featured Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, id) => (
              <ProductCard key={id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Serverc;
