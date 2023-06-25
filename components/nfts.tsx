import Image from "next/image";
import React from "react";

interface Data {
  img: string;
  artist: string;
  collectionId: number;
  totalNo: number;
  category: string;
  collectionName: string;
}

const data: Data[] = [
  {
    img: "/Art1.png",
    artist: "Vayo",
    collectionId: 1,
    totalNo: 5,
    category: "Art",
    collectionName: "chemalo",
  },
  {
    img: "/gaming1.jpeg",
    artist: "Voo",
    collectionId: 2,
    totalNo: 5,
    category: "Gaming",
    collectionName: "Grumpy Toads",
  },
  {
    img: "/music1.jpeg",
    artist: "Vayyy",
    collectionId: 3,
    totalNo: 5,
    category: "Music",
    collectionName: "Music",
  },
];

const Nfts = () => {
  return (
    <div className="grid grid-cols-5 gap-9 mt-6 mb-2">
      <div className="col-span-5 flex justify-between w-11/12 mx-auto">
        <p className=" w-72 text-gray-400 flex justify-start">Collection</p>
        <p className=" w-fit text-gray-400 hidden md:flex">Volume Traded</p>
        <p className=" w-fit text-gray-400 hidden md:flex">NFTs</p>
        <p className=" text-gray-400 w-20 justify-center hidden md:flex">
          Floor
        </p>
        <p className=" text-gray-400 w-24">Category</p>
      </div>

      {data.map((e, i) => {
        return (
          <div
            key={e.collectionId}
            className="col-span-5 flex items-center justify-between bg-gray-600 bg-opacity-30 lg:w-11/12 w-full mx-auto rounded-l-3xl rounded-r-md cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <Image
                src={e.img}
                alt="nft"
                className="w-16 rounded-full h-16 object-cover"
                width={300}
                height={300}
              />
              <p
                className="text-white w-52 font-semibold
            "
              >
                {e.collectionName}
              </p>
            </div>
            <p className="text-white hidden md:flex w-20 justify-center mr-4">
              1 Eth
            </p>
            <p className="text-white hidden md:flex w-10 justify-center">
              {e.totalNo}
            </p>
            <p className="text-white hidden md:flex w-20 justify-center">
              0.1 Eth
            </p>
            <p className="text-white w-24 flex text-ellipsis truncate">
              {e.category}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Nfts;
