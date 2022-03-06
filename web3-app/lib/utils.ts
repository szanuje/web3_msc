import { ethers } from "ethers";
import ethStorageAbi from "../abi/ETHStorage.json";
import masterTokenAbi from "../abi/MasterToken.json";

const ethStorageAddress = "0xCfCFA75475f2462D28dB2964Db8ac2F375230038";
const mtknAddress = "0xf17E09B60f278933f498c03a7B3fdFA0eB4C0FDb";

export const getETHStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = ethStorageAddress;
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, ethStorageAbi, provider);
};

export const getMasterTokenContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = mtknAddress;
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, masterTokenAbi, provider);
};

export const convert = async (
  ethereum: any,
  account: string | null
): Promise<any> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  const depositBalance = await contract.depositBalance(account);
  if (depositBalance.toString() === "0")
    throw new Error("You must deposit some Ether first");
  const signer = contract.connect(provider.getSigner());
  return signer.buyMaster();
};

export const getMTKNBalance = (
  ethereum: any,
  account: string | null
): Promise<any> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getMasterTokenContract(provider);
  return contract.balanceOf(account);
};

export const deposit = (amount: string, ethereum: any): Promise<any> => {
  let val;
  try {
    val = ethers.utils.parseEther(amount);
  } catch (err) {
    throw new Error("Invalid amount");
  }
  if (val.toString() === "0") throw new Error("Amount must not be zero");

  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  const signer = contract.connect(provider.getSigner());
  const options = { value: val };
  return signer.deposit(options);
};

export const getETHBalance = (
  ethereum: any,
  account: string | null
): Promise<any> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  return contract.depositBalance(account);
};

export const mint = async (
  url: string,
  ethereum: any,
  account: string | null
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const mtknContract = getMasterTokenContract(provider);

  const mintPrice = ethers.utils.parseEther("1000");
  const mtknBalance = await mtknContract.balanceOf(account);

  if (mtknBalance.lt(mintPrice))
    throw new Error("Master Token balance is too low");

  const allowance = await mtknContract.allowance(account, ethStorageAddress);
  console.log(allowance);

  if (allowance.lt(mintPrice)) {
    const signer = mtknContract.connect(provider.getSigner());
    const tx = await signer.approve(
      ethStorageAddress,
      ethers.utils.parseEther("1000")
    );
    throw new Error(
      `Wait for token approval to be confirmed and try mint again. Transaction id: ${tx.hash}`
    );
  }

  const contract = getETHStorageContract(provider);
  const signer = contract.connect(provider.getSigner());

  return await signer.mintMasterNFT(url);
};
