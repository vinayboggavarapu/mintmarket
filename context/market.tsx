import React, { createContext, useState } from "react";
import { marketAbi, contractAddress } from "./cont";
import { useContract, useProvider, useSigner } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

export const MarketContext = createContext<any>("");
const MarketStates = ({ children }: any) => {
  const [address, setaddress] = useState("");

  return (
    <MarketContext.Provider value={{ address, setaddress }}>
      {children}
    </MarketContext.Provider>
  );
};

export default MarketStates;
