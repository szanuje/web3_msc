async function main() {
  const [deployer] = await ethers.getSigners();

  console.log({
    deployment: {
      address: deployer.address,
      balance: (await deployer.getBalance()).toString(),
    },
  });

  const mtknContract = await ethers.getContractFactory("MasterToken");
  const nftContract = await ethers.getContractFactory("MasterNFT");
  const swapContract = await ethers.getContractFactory("Swap");
  const mainContract = await ethers.getContractFactory("MainContract");

  const mtknSupply = ethers.BigNumber.from(10 ** 5)
    .mul(10 ** 9)
    .mul(10 ** 9)
    .toString();

  const mtkn = await mtknContract.deploy(mtknSupply);
  const mtknAddress = mtkn.address;

  const mnft = await nftContract.deploy();
  const mnftAddress = mnft.address;

  const swap = await swapContract.deploy(mtknAddress);
  const swapAddress = swap.address;

  const main = await mainContract.deploy(mtknAddress, mnftAddress, swapAddress);
  const mainAddress = main.address;

  console.log({
    deployedContracts: {
      MasterToken: mtknAddress,
      MasterNFT: mnftAddress,
      Swap: swapAddress,
      MainContract: mainAddress,
    },
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
