"use client";
import { Searchcmp, Cartcont } from "@/app/clnt";
import { Product } from "@/backend/src/models/prodModel";
import { UserAccDocument } from "@/backend/src/models/userAccModel";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
const Login = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className=" group flex justify-center items-center hover:bg-blue-500 rounded-md cursor-pointer ">
        <div className="flex justify-between gap-2 p-2 items-center">
          <FaRegUser />
          <p>Login</p>
          <div className="  relative h-5 w-5  text-black flex items-center justify-center cursor-pointer transition-transform duration-300 transform  group-hover:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`absolute bg-white border shadow-md mt-2 py-2 px-4 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        {/* Dropdown items go here */}
        <a
          href="#"
          className="block text-gray-800 hover:bg-blue-500 hover:text-white py-1"
        >
          Item 1
        </a>
        <a
          href="#"
          className="block text-gray-800 hover:bg-blue-500 hover:text-white py-1"
        >
          Item 2
        </a>
        <a
          href="#"
          className="block text-gray-800 hover:bg-blue-500 hover:text-white py-1"
        >
          Item 3
        </a>
      </div>
    </div>
  );
};

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
            <li className=" text-black">{user.name ? user.name : <Login />}</li>
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
