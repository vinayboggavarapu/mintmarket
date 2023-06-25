import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Nfts from "@/components/nfts";
import React from "react";

const Collection = () => {
  return (
    <main className="bg-black min-h-[100vh] p-6 mx-auto bg-[url('/backgroundfull.png')] bg-no-repeat bg-center bg-cover ">
      <div className="flex flex-col max-w-[90rem] mx-auto gap-10">
        <Navbar />
        <Nfts />
        <Footer />
      </div>
    </main>
  );
};

export default Collection;
