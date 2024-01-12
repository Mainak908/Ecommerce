"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { add } from "../(redux)/cartitem";
import { RxCross1 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { Product } from "@/backend/src/models/prodModel";

export const CartBadge = ({ itemCount }: { itemCount: number }) => (
  <div className="relative group">
    <Link href="/cartpage">
      <AiOutlineShoppingCart
        size={32}
        className="text-gray-600 group-hover:text-red-500 transition duration-300 cursor-pointer"
      />
    </Link>

    {itemCount > 0 && (
      <span className="bg-red-500 text-white text-xs absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center rounded-full shadow-md">
        {itemCount}
      </span>
    )}
  </div>
);

export const Btncmp = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-indigo-600 text-white py-2 px-4 mt-4 rounded"
      onClick={() => dispatch(add(product))}
    >
      Add to Cart
    </button>
  );
};

export function Searchcmp({ product }: { product: Product[] }) {
  const [searchp, setsearchp] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setsearchp(false);
  };

  const handlefunc = (pname: any) => {
    setQuery(pname);
    setShowSuggestions(false);
    setsearchp(true);
  };
  const filteredProducts = product.filter((product: any) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className=" relative">
      <div className="flex">
        <input
          onChange={(e) => handleInputChange(e)}
          value={query}
          type="text"
          placeholder="Search products..."
          className="py-1 px-2 rounded-lg text-black w-96"
        />
        {showSuggestions && (
          <RxCross1
            className=" h-6 w-6 absolute right-12 top-1 text-black cursor-pointer"
            onClick={() => setQuery("")}
          />
        )}
        <BiSearch
          className=" h-8 w-8 cursor-pointer absolute right-3 text-black"
          onClick={() => setsearchp(true)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-10 mt-2 py-2 w-96 bg-white rounded-lg shadow-lg">
          {filteredProducts.map((product: any, id: any) => (
            <div
              key={id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black w-96"
              onClick={() => handlefunc(product.name)}
            >
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Cartcont() {
  return <CartBadge itemCount={useSelector((no: any) => no.cart.length)} />;
}
