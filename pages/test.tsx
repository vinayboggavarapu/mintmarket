import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { MarketContext } from "@/context/market";
import Navbar from "@/components/Navbar";

const contract = "0x3e83427b9E0209d285004341cB654b72e7E23C7D";
const Abi = [
  {
    inputs: [],
    name: "setmsg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "findValue",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "val",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        internalType: "struct MagicArray.Data[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const FileUpload = () => {
  const { address } = useContext(MarketContext);
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const { data, isError, isLoading, status } = useContractRead({
    address: contract,
    abi: Abi,
    functionName: "findValue",
    args: [],
    overrides: { from: address },
  });

  const { config } = usePrepareContractWrite({
    address: contract,
    abi: Abi,
    functionName: "setmsg",
  });
  const { isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    console.log(data);
  });

  return (
    <>
      <Navbar />
      <label class="form-label">Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={() => write?.()}>Submit</button>
    </>
  );
};

export default FileUpload;
