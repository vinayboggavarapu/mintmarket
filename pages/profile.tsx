import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState, useContext } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { HiShare } from "react-icons/hi";
import { contractAddress, marketAbi } from "@/context/cont";
import { useContractRead, useProvider, useSigner } from "wagmi";
import { MarketContext } from "@/context/market";
import { useForm } from "react-hook-form";

const Profile = () => {
  const Address: string = "0xEbc555555aA69586132cc58dG48b301dA6f60070";
  const Data = [...Array(10)];
  const [selected, setselected] = useState("");
  const [selectId, setselectId] = useState(0);
  const [isSelected, setisSelected] = useState(false);
  const [nfts, setnfts]: any = useState([]);
  const { address } = useContext(MarketContext);

  type Form = {
    price: string;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = (data: any) => console.log(data);

  let { data, isError, isLoading, status } = useContractRead({
    address: contractAddress,
    abi: marketAbi,
    functionName: "listAllNfts",
    chainId: 80001,
    overrides: { from: address },
  });

  useEffect(() => {
    setnfts(data);
    console.log(data);
  }, [address]);

  return (
    <main className="bg-black min-h-screen p-6 mx-auto bg-[url('/backgroundfull.png')] bg-no-repeat bg-center bg-cover ">
      <section className="flex flex-col max-w-[90rem] mx-auto gap-10">
        <Navbar />
        <div className="relative">
          <Image
            src="/profileBanner.png"
            className="w-full mt-4 rounded-md h-32 md:h-64 bg-gray-300"
            alt="banner"
            width={500}
            height={500}
          />
          <div className="absolute border-2 bottom-[-1.5rem] md:bottom-[-3rem] left-3 rounded-full overflow-hidden">
            <Image
              src="/karma.jpg"
              className="w-20 h-20 md:w-32 md:h-32"
              alt="profile"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-6">
          <div>
            <h2 className="text-white text-2xl font-semibold">Knox</h2>
            <div className="text-white flex ">
              {Address.slice(0, 4)}
              <p className="w-8 text-ellipsis overflow-hidden">
                {Address.slice(4, Address.length - 5)}
              </p>
              {Address.slice(Address.length - 5, -1)}
            </div>
          </div>
          <div className="flex justify-end gap-7 items-center">
            <FaEllipsisH className="text-xl text-white bg-blue-100 w-9 h-9 p-2 rounded-full bg-opacity-40 cursor-pointer" />
            <HiShare className="text-xl text-white bg-blue-100 w-9 h-9 p-2 rounded-full bg-opacity-40 cursor-pointer" />
          </div>
        </div>
        <h3 className="text-gray-400 text-4xl mt-4 font-semibold">
          Your Collections
        </h3>
        <div className="relative flex justify-center items-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-x-20 mx-auto w-5/6 items-center ">
            {nfts.map((e: any, i: number) => {
              return (
                <div
                  key={i}
                  className={`flex ${
                    isSelected ? "blur-md" : ""
                  } relative flex-col justify-start border w-full h-[22rem] lg:h-[27rem] rounded-lg overflow-hidden  shadow-sm  shadow-blue-200 group`}
                >
                  <Image
                    src={e.tokenURI}
                    className="w-full group-hover:scale-105 object-cover transition-all ease-in"
                    alt="userNFTs"
                    width={500}
                    height={500}
                  />

                  <div className="absolute bottom-0 w-full z-10 bg-gray-900 h-24 flex flex-col p-1">
                    <div className="flex items-center justify-between p-2 w-11/12 mx-auto  bottom-0">
                      <p className="text-white font-semibold text-lg">
                        Cool Monkeys
                      </p>
                      <p className="font-mono text-white text-xl">
                        {`#${e.tokenId.toNumber()}`}
                      </p>
                    </div>
                    <button
                      className="text-orange-200 w-11/12 mx-auto px-2 text-right"
                      onClick={() => {
                        setselected(e.tokenURI);
                        setselectId(e.tokenId.toString());
                        setisSelected(true);
                      }}
                    >
                      List For Sale
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {isSelected && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="absolute bg-gray-900 p-2 z-10 gap-4 rounded-md top-14 border mx-auto border-white flex flex-col max-w-lg w-full items-center"
            >
              <p
                onClick={() => setisSelected(false)}
                className="text-blue-800 border-2  cursor-pointer self-end font-bold bg-green-300 opacity-75 flex items-center justify-center w-7 rounded-full h-7"
              >
                X
              </p>
              <Image src={selected} width={300} height={300} alt="selected" />
              <div className="flex justify-evenly w-3/4">
                <input
                  {...(register("price"), { required: true })}
                  placeholder="Enter the listing price"
                  onChange={(e) => setValue("price", e.target.value)}
                  className={`focus:outline-none px-2 rounded-sm ${
                    errors.price ? "border-red-500" : "border-white"
                  }`}
                />
                <button type="submit" className="p-2 rounded-md bg-blue-200">
                  Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
