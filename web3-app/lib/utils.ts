import { ethers } from "ethers";
import ethStorageAbi from "../abi/ETHStorage.json";
import masterTokenAbi from "../abi/MasterToken.json";

export const getETHStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = "0x265565bcad7834902101db7b495f1655d1512665";
  console.log(contractAddress);
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, ethStorageAbi, provider);
};

export const getMasterTokenContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = "0x86521613e20001499aeEb4A44Dfd43bC14Df5CE9";
  console.log(contractAddress);
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, masterTokenAbi, provider);
};
