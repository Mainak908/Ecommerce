"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { add } from "../(redux)/cartitem";
import { RxCross1 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { Product } from "@/backend/src/models/prodModel";
import debounce from "lodash.debounce";

import Navbar from "@/app/components/navbar";

import { fetchUserData } from "./try";

import { RootState } from "@/(redux)/store";
import { UserAccDocument } from "@/backend/src/models/userAccModel";

import { login } from "@/(redux)/authenticate";

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

const fetchProducts = async (query: string): Promise<Product[]> => {
  const response = await fetch(
    `http://localhost:3001/api/v1/singleproductSearch/${query}`
  );
  const data = await response.json();
  return data;
};

export function Searchcmp() {
  const [searchp, setsearchp] = useState(false);
  const [searchQuery, setsearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const debouncedSearch = debounce(async (query: string) => {
    const results = await fetchProducts(query);
    setSearchResults(results);
  }, 1000);

  useEffect(() => {
    debouncedSearch(searchQuery);
    // Cancel the debounce when the component unmounts
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
    setsearchp(false);
  };

  const handlefunc = (pname: string) => {
    setsearchQuery(pname);
    setShowSuggestions(false);
    setsearchp(true);
  };

  return (
    <div className=" relative">
      <div className="flex">
        <input
          onChange={(e) => handleInputChange(e)}
          value={searchQuery}
          type="text"
          placeholder="Search products..."
          className="py-1 px-2 rounded-lg text-black w-96 bg-blue-100"
        />
        {showSuggestions && (
          <RxCross1
            className=" h-6 w-6 absolute right-12 top-1 text-black cursor-pointer"
            onClick={() => setsearchQuery("")}
          />
        )}
        <BiSearch
          className=" h-8 w-8 cursor-pointer absolute right-3 text-black"
          onClick={() => setsearchp(true)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-10 mt-2 py-2 w-96 bg-white rounded-lg shadow-lg">
          {searchResults.map((product, id) => (
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

interface ApiResponse<T> {
  success: boolean;
  user: T;
}

const FrontPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/me", {
          method: "GET",
          credentials: "include",
        });

        const resData = await response.json();

        if (resData.success) {
          dispatch(login({ userData: resData.user }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.userData as UserAccDocument
  );

  return (
    <div className="bg-white">
      <Navbar user={user} />
    </div>
  );
};

export default FrontPage;
