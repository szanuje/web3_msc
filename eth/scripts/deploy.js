async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ethStorage = await ethers.getContractFactory("ETHStorage");
  const storage = await ethStorage.deploy();

  console.log("Contract address:", storage.address);
  console.log("Token address:", await storage.token());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
