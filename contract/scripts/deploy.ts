import { ethers } from "hardhat";

async function main() {
  const marketPlace = await ethers.getContractFactory("Market");
  const market = await marketPlace.deploy("MintHub", "MNT");

  await market.deployed();

  console.log(`NFTMarketplace Contract deployed to ${market.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
