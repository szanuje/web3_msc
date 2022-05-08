import { ethers } from "ethers";
import mainABI from "../abi/MainContract.json";
import mtknABI from "../abi/MasterToken.json";

const ethStorageAddress = "0xCfCFA75475f2462D28dB2964Db8ac2F375230038";
const mtknAddress = "0xf17E09B60f278933f498c03a7B3fdFA0eB4C0FDb";

export const getETHStorageContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = ethStorageAddress;
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, mainABI, provider);
};

export const getMasterTokenContract = (
  provider: ethers.providers.Web3Provider
) => {
  const contractAddress = mtknAddress;
  if (!contractAddress) throw Error("Can't parse contract address.");
  return new ethers.Contract(contractAddress, mtknABI, provider);
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
