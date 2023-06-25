import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="relative group w-full overflow-hidden h-72">
        <Image
          src="/music1.jpeg"
          className="rounded-md w-full h-full object-cover object-center group-hover:scale-110 transition-all ease-in opacity-60"
          width={800}
          height={800}
          alt="banner"
        />
        <div className="absolute flex flex-col gap-2 bottom-0 p-5 z-10">
          <p className="text-white font-semibold text-lg">Grumpy Toads</p>
          <p className="text-white font-semibold  text-lg">By Combi Artist</p>
        </div>
        <button className="absolute text-white  right-3 bottom-3 p-3 bg-gray-400 bg-opacity-40 font-semibold rounded-lg">
          View Collection
        </button>
      </div>
    </div>
  );
};

export default Banner;
