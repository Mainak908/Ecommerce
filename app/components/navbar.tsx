"use client";
import { Searchcmp, Cartcont } from "@/app/clnt";
import { Product } from "@/backend/src/models/prodModel";
import { UserAccDocument } from "@/backend/src/models/userAccModel";
import Link from "next/link";
import React from "react";

const Navbar = ({ user }: { user: UserAccDocument }) => {
  return (
    <header className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/userhome" className="text-3xl font-semibold">
          MyShop
        </Link>
        <Searchcmp />
        <nav>
          <ul className="flex space-x-4">
            <li className=" text-black">
              {user ? user.name : <h3 className=" text-black">login</h3>}
            </li>
            <li>
              <Cartcont />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
