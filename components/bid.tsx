import Image from "next/image";
import React from "react";

const Bid = () => {
  const sales = [...Array(4)];
  return (
    <div>
      <h2 className="text-white text-xl font-semibold mb-4">Art Sales</h2>
      <div className="flex gap-3">
        {sales.map((_, i) => {
          return (
            <div
              className="flex flex-col relative  w-96 h-[25.5rem] rounded-md shadow-lg overflow-hidden group"
              key={i}
            >
              <div className="text-white absolute bg-[#222B59] skew-x-[-45deg] p-2 rounded-md w-48 left-[-1.5rem] h-16 top-[-5px] z-10 "></div>
              <div className="left-3 absolute z-10">
                <p className=" text-white">Time Remaining</p>
                <p className="text-orange-200 font-mono font-semibold text-xl">
                  3h:15m:20s
                </p>
              </div>
              <Image
                src="/kog.jpg"
                className="w-full rounded-t-md group-hover:scale-110 transition-all ease-in cursor-pointer"
                width={300}
                height={300}
                alt="sales"
              />
              <div className="text-white flex justify-between absolute bottom-0 right-0 bg-[#222B59] w-full h-14 items-center">
                <button className="w-fit ml-3 text-yellow-100">Bid</button>
                <p className="p-1 text-right w-fit">
                  Current Bid :{" "}
                  <span className="text-orange-200 font-mono mr-3">
                    1 MATIC
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bid;
