import React, { useState } from "react";
import Music from "./music";
import Art from "./art";
import Gaming from "./gaming";
import Photography from "./photography";

const Filter = () => {
  const [filter, setfilter] = useState("Music");

  const render = (filter: string) => {
    switch (filter) {
      case "Music":
        return <Music />;
      case "Art":
        return <Art />;
      case "Gaming":
        return <Gaming />;
      case "Photography":
        return <Photography />;
      default:
        return <></>;
    }
  };
  return (
    <div className="flex flex-col gap-3 mb-10">
      <h2 className="text-white text-2xl font-semibold">Featured NFTs</h2>
      <p className="text-white">Find the trending NFTs in demand</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 w-2/3 mx-auto mt-3 gap-y-3 gap-x-3">
        <p
          className={
            filter == "Music"
              ? "select-filter"
              : "text-white text-center lg:w-1/2 cursor-pointer"
          }
          onClick={() => setfilter("Music")}
        >
          Music
        </p>
        <p
          className={
            filter == "Art"
              ? "select-filter"
              : "text-white text-center lg:w-1/2 cursor-pointer"
          }
          onClick={() => setfilter("Art")}
        >
          Art
        </p>
        <p
          className={
            filter == "Gaming"
              ? "select-filter"
              : "text-white text-center lg:w-1/2 cursor-pointer"
          }
          onClick={() => setfilter("Gaming")}
        >
          Gaming
        </p>
        <p
          className={
            filter == "Photography"
              ? "select-filter"
              : "text-white text-center lg:w-1/2 cursor-pointer"
          }
          onClick={() => setfilter("Photography")}
        >
          Photography
        </p>
      </div>
      {render(filter)}
    </div>
  );
};

export default Filter;
