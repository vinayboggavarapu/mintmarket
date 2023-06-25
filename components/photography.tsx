import Image from "next/image";
import React from "react";

const Photography = () => {
  const photos = [...Array(5)];
  return (
    <div className="flex gap-3 mt-3">
      {photos.map((_, i) => {
        return (
          <div key={i}>
            <div className="relative flex">
              <Image
                src="/photo1.jpg"
                height={300}
                width={300}
                className="rounded-md"
                alt="photography nft"
              />
              <div className="text-white bg-[#1D243C] absolute flex flex-col items-center bottom-[-1.5rem] w-3/4 right-0 rounded-md p-2">
                <p>The Mountains</p>
                <p className="font-mono">
                  <span className="font-semibold">Floor :</span> 1eth
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Photography;
