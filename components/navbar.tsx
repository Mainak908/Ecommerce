import { Searchcmp, Cartcont } from "@/app/clnt";
import { Product } from "@/backend/src/models/prodModel";
import Link from "next/link";
import React from "react";

const Navbar = ({ products }: { products: Product[] }) => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/userhome" className="text-3xl font-semibold">
          MyShop
        </Link>
        <Searchcmp product={products} />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/userhome">Home</Link>
            </li>
            <li>
              <Link href="/userhome">Products</Link>
            </li>
            <li>
              <Link href="/userhome">Contact</Link>
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
