import Link from "next/link";
import React from "react";
import { IoSend } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5">
        <p className="text-white leading-7">
          NFTHUB is the ultimate destination for anyone looking to invest in
          this exciting new asset class. Join our vibrant community of NFT
          enthusiasts today and start discovering the limitless possibilities of
          the blockchain!
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-white">Discover</p>
          <div className="w-fit ml-3 flex flex-col gap-3">
            <Link href="/collection">
              <p className="text-white">Collection</p>
            </Link>
            <p className="select-purple text-white">Search</p>
            <p className="select-purple text-white">Author</p>
            <p className="select-purple text-white">Upload NFT</p>
            <p className="select-purple text-white">Blog</p>
          </div>
        </div>
        <p className="text-white">About</p>
        <div className="flex flex-col gap-4">
          <p className="text-white">Subscribe</p>
          <div className="relative flex items-center w-2/3 bg-blue-50 rounded ml-3">
            <IoSend className="absolute right-0 text-gray-400 bg-blue-50 w-9 cursor-pointer" />
            <input
              placeholder="Enter your mail"
              className="outline-none border-none shadow-none bg-transparent w-5/6 p-2 rounded"
            />
          </div>
          <p className="text-white ml-3">Get updates faster</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
