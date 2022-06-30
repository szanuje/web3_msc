import { ethers } from "ethers";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";
import mainABI from "../abi/MainContract.json";
import mtknABI from "../abi/MasterToken.json";
import { NFTLink } from "./nft-link";

const MAIN_ADDRESS = process.env.REACT_APP_MAIN_ADDRESS as string;
const MTKN_ADDRESS = process.env.REACT_APP_MTKN_ADDRESS as string;

const txUrl = "https://rinkeby.etherscan.io/tx";

export function MintNft() {
  const { data: signer } = useSigner();
  const { data: account, isLoading: accountLoading } = useAccount();

  const { data: mtknBalance } = useBalance({
    addressOrName: account?.address,
    token: MTKN_ADDRESS,
    watch: true,
    cacheTime: 7_000,
    enabled: account && !accountLoading,
  });

  const { data: allowance } = useContractRead(
    {
      addressOrName: MTKN_ADDRESS,
      contractInterface: mtknABI,
    },
    "allowance",
    {
      args: [account?.address, MAIN_ADDRESS],
      watch: true,
      enabled: !!account && !accountLoading,
    }
  );

  const { write: approve } = useContractWrite(
    {
      addressOrName: MTKN_ADDRESS,
      contractInterface: mtknABI,
      signerOrProvider: signer,
    },
    "approve",
    {
      args: [MAIN_ADDRESS, ethers.utils.parseEther("1000")],
      onSuccess(tx) {
        toast.success(
          <div className="space-x-1 inline-flex">
            <p>Transaction sent:</p>
            <a className="text-sky-500" href={`${txUrl}/${tx}`}>
              Etherscan
            </a>
          </div>,
          {
            duration: 8000,
          }
        );
      },
      onError(e) {
        toast.error("Something went wrong");
        console.error(e);
      },
    }
  );

  const [url, setUrl] = useState("");

  const { write: mint } = useContractWrite(
    {
      addressOrName: MAIN_ADDRESS,
      contractInterface: mainABI,
      signerOrProvider: signer,
    },
    "mintMasterNFT",
    {
      args: [url],
      onSuccess(tx) {
        toast.loading(
          <div className="space-x-1 inline-flex">
            <p>Transaction sent:</p>
            <a className="text-sky-500" href={`${txUrl}/${tx}`}>
              Etherscan
            </a>
          </div>,
          {
            duration: 8000,
          }
        );
      },
      onError(e) {
        toast.error("Something went wrong");
        console.error(e);
      },
    }
  );

  return (
    <div className="flex flex-col items-start justify-between w-full px-10 lg:flex-row inline-table space-y-3">
      <div className="relative z-10 w-full max-w-3xl mt-20 lg:mt-0">
        <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
          <h4 className="w-full text-xl font-medium leading-snug">Mint NFT</h4>
          <div className="relative w-full mt-6 space-y-8">
            <div className="relative w-full">
              <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">
                URL
              </label>
              <input
                type="text"
                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                placeholder="https://ipfs.io/ipfs/..."
                onChange={({ target: { value } }) => {
                  setUrl(value);
                }}
              />
              <p className="mt-2 font-medium text-gray-600 bg-white">
                Requires 1000 tokens
              </p>
            </div>

            <div>
              <button
                className="inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease"
                onClick={() => {
                  if (!account) {
                    toast.error("Connect your wallet");
                    return;
                  }
                  if (parseFloat(mtknBalance?.formatted || "0") < 1000) {
                    toast.error("You need at least 1000 MTKN");
                  }
                  const allow = (allowance || ethers.BigNumber.from(0)).gte(
                    ethers.BigNumber.from(1000)
                  );
                  console.log(allow);
                  console.log(allowance);
                  if (!allow) {
                    toast.success("You must allow your MTKN to be spend");
                    approve();
                  }
                  if (parseFloat(mtknBalance?.formatted || "0") >= 1000) {
                    mint();
                  }
                }}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
      {account?.address && <NFTLink address={account.address} />}
    </div>
  );
}
