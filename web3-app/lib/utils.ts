import { ethers } from "ethers";
import abi from "../contract-abi.json";

export const getETHStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = "0x265565bcad7834902101db7b495f1655d1512665";
  console.log(contractAddress);
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, abi, provider);
};
