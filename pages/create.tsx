import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { BiImageAdd } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { MarketContext } from "@/context/market";
import {
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useSignMessage,
  useSigner,
} from "wagmi";

import { contractAddress, marketAbi } from "@/context/cont";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

enum Category {
  Gaming = "Gaming",
  Art = "Art",
  Photography = "Photography",
  Music = "Music",
}
interface Form {
  name: string;
  category: Category;
  description: string;
  file: string;
}

const Create = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const [file, setfile] = useState("");
  const [fileName, setfileName] = useState("no file chosen");
  const { address } = useContext(MarketContext);
  const [selected, setselected] = useState("");
  const [nftDetails, setnftDetails] = useState("");
  const [minted, setminted] = useState(false);
  const router = useRouter();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: marketAbi,
    functionName: "mint",
    args: [file],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const onSubmit: SubmitHandler<Form> = (e) => {
    setnftDetails(
      JSON.stringify({
        pinataMetadata: {
          name: e.name,
        },
        pinataContent: {
          name: e.name,
          category: e.category,
          img: e.file,
          description: e.description,
        },
      })
    );
    console.log(e);
    write?.();
  };

  //
  const pinFileToIPFS = async (img: any) => {
    const formData = new FormData();

    formData.append("file", img.img);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
          },
        }
      );
      setfile(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    } catch (error) {
      console.log(error);
    }
  };
  //

  //Uploading to the MetaData to Pinata Once Transaction is Completed
  const pinataMint = async () => {
    try {
      if (isSuccess) {
        const upload = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          nftDetails,
          {
            headers: {
              "Content-Type": "application/json",
              pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API,
              pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
            },
          }
        );

        console.log(
          `https://gateway.pinata.cloud/ipfs/${upload.data.IpfsHash}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const complete = useCallback(() => {
    if (isSuccess) {
      setminted(true);
    }
    setTimeout(() => {
      setminted(false);
    }, 2000);
  }, [isSuccess]);

  useEffect(() => {
    if (file != "") {
      setValue("file", file);
    }
  }, [file]);

  useEffect(() => {
    pinataMint();
    router.push("/profile");
  }, [isSuccess]);

  return (
    <main className="bg-black min-h-screen p-6 mx-auto bg-[url('/backgroundfull.png')] bg-no-repeat bg-center bg-cover ">
      {/* <p
        onClick={() => {
          write?.();
          console.log(data);
        }}
        className="text-white"
      >
        Signer
      </p> */}
      <div className="relative flex flex-col max-w-[90rem] mx-auto gap-10">
        <Navbar />
        {minted && (
          <p className="flex justify-center items-center shadow-sm right-6 p-2 font-semibold bg-white absolute top-28 w-1/5 h-24 rounded-md ">
            Minting Successful
          </p>
        )}

        {address != undefined ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 mt-8 max-w-4xl mx-auto w-full"
          >
            <div>
              <h2 className="text-white text-2xl">Create New Item</h2>
              <p className="text-white">
                Set your prefered name and add additional information
              </p>
            </div>

            <div className="text-white">
              <h2 className="text-2xl">Image, Video, Audio, or 3D Model</h2>
              <p>Max size 100 MB</p>
            </div>
            <div
              className={
                errors.file
                  ? "h-48 md:w-5/6 border-dashed border-2 border-red-300 border-opacity-40 rounded-md flex flex-col justify-center items-center"
                  : "h-48 md:w-5/6 border-dashed border-2 border-gray-300 border-opacity-40 rounded-md flex flex-col justify-center items-center"
              }
            >
              {file === "" ? (
                <BiImageAdd className="text-white text-6xl opacity-60" />
              ) : (
                <Image
                  src={file}
                  className="w-36 h-36"
                  height={300}
                  width={300}
                  alt="nft"
                />
              )}
              <div>
                <section className="flex gap-1 items-center relative">
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="drag"
                      className="text-blue-300 underline underline-offset-4 cursor-pointer"
                    >
                      Choose
                    </label>
                    <p className="text-white ml-2">{fileName}</p>
                    <input
                      type="file"
                      accept="image/*"
                      id="drag"
                      {...(register("file"), { required: true })}
                      onChange={(e) => {
                        pinFileToIPFS({ img: e.target.files[0] });
                        setfileName(e.target.files[0].name);
                        console.log(e.target.files[0]);
                        // setValue("file", file);
                      }}
                      className="opacity-0 absolute"
                    />
                  </div>
                </section>
              </div>
            </div>
            <label className="flex flex-col gap-4">
              <p className={"text-white text-2xl"}>Item name</p>
              <input
                placeholder="NFT name"
                className={
                  errors.name
                    ? "md:w-5/6 p-2 rounded-md focus:outline-none border-2  border-red-400 shadow-lg shadow-red-400"
                    : "md:w-5/6 p-2 rounded-md focus:outline-none"
                }
                {...register("name", { required: true })}
              />
            </label>

            <label className="flex flex-col gap-4">
              <p className="text-white text-2xl">Category</p>
              {errors.category && (
                <p className="text-red-300">Select a category</p>
              )}
              <div
                className="flex gap-9 items-center flex-col md:flex-row "
                {...register("category", { required: true })}
              >
                <div
                  className={
                    selected == Category.Gaming
                      ? "relative flex  items-center justify-center rounded-full overflow-hidden border-2  border-gray-200 cursor-pointer "
                      : "relative flex  items-center justify-center rounded-full overflow-hidden cursor-pointer"
                  }
                  onClick={() => {
                    setValue("category", Category.Gaming);
                    setselected(Category.Gaming);
                  }}
                >
                  <Image
                    src="/gameselect.jpg"
                    className="rounded-full w-28 h-28 object-fill opacity-30 bg-gray-400"
                    alt="art"
                    width={300}
                    height={300}
                  />
                  <p className="text-white absolute font-semibold">Gaming</p>
                </div>
                <div
                  className={
                    selected == Category.Art
                      ? "relative flex  items-center justify-center rounded-full overflow-hidden border-2  border-gray-200 cursor-pointer "
                      : "relative flex  items-center justify-center rounded-full overflow-hidden cursor-pointer"
                  }
                  onClick={() => {
                    setValue("category", Category.Art);
                    setselected(Category.Art);
                  }}
                >
                  <Image
                    src="/artselect.jpg"
                    className="rounded-full w-28 h-28 object-fill opacity-30 bg-gray-400"
                    alt="art"
                    width={300}
                    height={300}
                  />

                  <p className="text-white absolute font-semibold">Art</p>
                </div>
                <div
                  className={
                    selected == Category.Photography
                      ? "relative flex  items-center justify-center rounded-full overflow-hidden border-2  border-gray-200 cursor-pointer "
                      : "relative flex  items-center justify-center rounded-full overflow-hidden cursor-pointer"
                  }
                  onClick={() => {
                    setValue("category", Category.Photography);
                    setselected(Category.Photography);
                  }}
                >
                  <Image
                    src="/photoselect.jpg"
                    className="rounded-full w-28 h-28 object-fill opacity-30 bg-gray-400"
                    alt="art"
                    width={300}
                    height={300}
                  />
                  <p className="text-white absolute text-sm font-semibold">
                    Photography
                  </p>
                </div>
                <div
                  className={
                    selected == Category.Music
                      ? "relative flex  items-center justify-center rounded-full overflow-hidden border-2  border-gray-200 cursor-pointer "
                      : "relative flex  items-center justify-center rounded-full overflow-hidden cursor-pointer"
                  }
                  onClick={() => {
                    setValue("category", Category.Music);
                    setselected(Category.Music);
                  }}
                >
                  <Image
                    src="/musicselect.jpg"
                    className="rounded-full w-28 h-28 object-fill opacity-30 bg-gray-400"
                    alt="art"
                    width={300}
                    height={300}
                  />
                  <p className="text-white absolute text font-semibold">
                    Music
                  </p>
                </div>
              </div>
            </label>
            <label className="flex flex-col gap-4">
              <p className="text-white text-2xl">Description</p>
              <textarea
                rows={4}
                className={
                  errors.description
                    ? "w-full md:w-5/6 rounded-md p-2 focus:outline-none  border-2 border-red-600 shadow-lg shadow-red-400"
                    : "w-full md:w-5/6 rounded-md p-2 focus:outline-none"
                }
                {...register("description", { required: true })}
              ></textarea>
            </label>

            <button
              type="submit"
              className="text-white text-xl md:w-5/6 p-4 bg-gray-700 rounded-full"
            >
              Mint
            </button>
          </form>
        ) : (
          <h2 className="flex  text-white text-3xl h-96 justify-center items-center">
            Connect Your Wallet
          </h2>
        )}
      </div>
    </main>
  );
};

export default Create;
