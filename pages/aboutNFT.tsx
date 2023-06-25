/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/Navbar";
import React from "react";

const aboutNFT = () => {
  return (
    <main className="bg-black min-h-screen p-6 mx-auto bg-[url('/backgroundfull.png')] bg-no-repeat bg-center bg-cover ">
      <div className="flex flex-col max-w-[90rem] mx-auto gap-10 ">
        <Navbar />
        <h2 className="text-2xl text-white mt-6"> What are NFTs ?</h2>
        <p className="text-white text-lg leading-10">
          NFT stands for "Non-Fungible Token." It is a unique digital asset that
          is stored on a blockchain, which is a distributed ledger technology
          that records transactions securely and transparently. Each NFT is
          one-of-a-kind and cannot be replicated or divided into smaller parts,
          which makes it different from other digital assets like
          cryptocurrencies that are fungible. NFTs have gained popularity in
          recent years because they allow creators to sell their digital art,
          music, videos, and other creative works as unique assets, which can be
          bought and sold like physical art or collectibles. NFTs have opened up
          a new market for creators to monetize their work and for collectors to
          invest in unique digital assets. The ownership and authenticity of an
          NFT are recorded on a blockchain, which makes it impossible to copy or
          duplicate the asset. Each NFT has a unique identifier, which is stored
          on the blockchain, and it includes information about the creator, the
          owner, and the transaction history of the asset. One of the main
          benefits of NFTs is that they provide a way for creators to monetize
          their digital assets and earn a living from their work. In the past,
          it was difficult for artists and musicians to make money from their
          digital creations because they could be easily copied and distributed
          without permission. NFTs provide a solution to this problem by
          allowing creators to sell their work as unique assets that cannot be
          replicated or stolen. NFTs have also opened up a new market for
          collectors and investors. Because each NFT is unique and has a limited
          supply, collectors are willing to pay high prices for rare and
          valuable assets. Some NFTs have sold for millions of dollars, which
          has created a lot of hype and attention around the market. However,
          there are also some criticisms of the NFT market. Some people argue
          that it is a speculative bubble that will eventually burst, and that
          the prices of NFTs are not based on the intrinsic value of the assets
          themselves, but rather on hype and speculation. Another criticism is
          that NFTs are not environmentally friendly because they require a lot
          of energy to produce and maintain. The process of creating and storing
          NFTs on a blockchain requires a lot of computing power, which can
          contribute to carbon emissions and environmental damage. In
          conclusion, NFTs are a new and exciting way for creators to monetize
          their digital assets and for collectors to invest in unique and
          valuable assets. While there are some criticisms of the market, it is
          clear that NFTs have opened up a new world of possibilities for
          artists, musicians, and other creators who were previously unable to
          profit from their digital work.
        </p>
      </div>
    </main>
  );
};

export default aboutNFT;
