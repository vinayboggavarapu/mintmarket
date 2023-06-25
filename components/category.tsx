import Image from "next/image";
import React from "react";

const Category = () => {
  const categories = [...Array(6)];
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-white text-2xl font-semibold">
        Verified Collections
      </h2>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-y-7 gap-x-0 w-full lg:w-5/6 mx-auto">
        {categories.map((e, i) => {
          return (
            <div key={i} className="flex flex-col items-center mt-5">
              <div>
                <Image
                  src="/karma.jpg"
                  height={300}
                  width={300}
                  alt="nft"
                  className="rounded-full w-36"
                />
                <div>
                  <p className=" font-semibold text-rose-200">Dancing Monkey</p>
                  <p className="text-white text-sm ">1200 NFTS</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
