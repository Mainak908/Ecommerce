import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FlipkartNavbar = () => {
  return (
    <nav className="bg-white p-4 mt-4">
      <div className=" flex items-center justify-between overflow-x-scroll no-scrollbar ">
        <div className=" flex space-x-4 lg:mx-auto">
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
          <Link
            href="#"
            className="text-black hover:text-gray-300 flex flex-col items-center justify-center gap-1"
          >
            <Image src="/flipkart1.webp" height={64} width={64} alt="" />
            <p>Electronics</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default FlipkartNavbar;
