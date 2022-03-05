import { ethers } from "ethers";
import ethStorageAbi from "../abi/ETHStorage.json";
import masterTokenAbi from "../abi/MasterToken.json";

export const getETHStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = "0x02B3fFC2158aF2b8406361f46cBCbA4Eabc51977";
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, ethStorageAbi, provider);
};

export const getMasterTokenContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = "0x2AcED6034De25340ff229DF78871a648A42Cb87D";
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, masterTokenAbi, provider);
};
