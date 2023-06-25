import Link from "next/link";
import React, { useState } from "react";

const Discover = () => {
  const [discover, setdiscover] = useState(false);
  return (
    <div className="relative">
      <p
        className="text-white cursor-pointer "
        onClick={() => setdiscover(!discover)}
      >
        Discover
      </p>
      {discover && (
        <div className="absolute z-20 top-10 rounded-md p-3 flex flex-col gap-3 bg-white border shadow-sm shadow-white w-40">
          <Link href="/collection">
            <p className="select-purple">Collection</p>
          </Link>
          <p className="select-purple">Search</p>
          <Link href="/aboutNFT">
            <p className="select-purple">NFT 101</p>
          </Link>
          <p className="select-purple">Blog</p>
        </div>
      )}
    </div>
  );
};

export default Discover;
