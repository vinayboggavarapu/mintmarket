import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import Discover from "./discover/Discover";
import Notification from "./notification/notification";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MarketContext } from "@/context/market";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { setaddress } = useContext(MarketContext);
  const { address } = useAccount();
  useEffect(() => {
    setaddress(address);
  }, [address]);
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logonft.png"
          className="w-12 h-12"
          width={300}
          height={300}
          alt="logo"
        />
      </Link>
      <div className="relative border-0 lg:border flex items-center border-blue-400 rounded-xl ">
        <BiSearch className="absolute ml-2 text-xl text-gray-400" />
        <input
          placeholder="Search"
          className="p-2 ml-7  focus:outline-none bg-transparent text-white"
        ></input>
      </div>

      <div className="flex items-center gap-16">
        <div className="hidden relative lg:flex space-x-16 h-full">
          <div>
            <Discover />
          </div>
          {/* <p className="text-white">About</p> */}
          <Notification />
          <Link href="/create">
            <p className="text-white h-full">Create</p>
          </Link>
          <Link href="/test">
            <p className="text-white">Connect</p>
          </Link>

          <Link href="/profile">
            <p className="text-white">Profile</p>
          </Link>
        </div>
        <div className="hidden md:flex">
          <ConnectButton showBalance={false} />
        </div>
        <div className="flex lg:hidden items-center space-x-7 h-full ">
          {/* <BiSearch className="text-white text-3xl " /> */}
          <RxHamburgerMenu className="text-white text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
