import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

export function MintNftComp() {
  const { status, ethereum } = useMetaMask();
  return (
    <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 m-100 shadow-sm">
      <div className="mr-auto">
        <p className="font-mono text-lg font-bold text-gray-800 pr-5">
          Mint NFT:
        </p>
        <p className="space-x-2 text-sm font-medium text-gray-500">
          <span>Requires 1000 MTKN</span>
        </p>
      </div>
      <input
          className="w-96 -ml-px items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="url"
        ></input>
      {status === "connected" ? (
        <button
          className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 hover:bg-sky-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          onClick={mint}
        >
          Mint
        </button>
      ) : (
        <button className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
          Mint<span className="tooltiptext">Connect your wallet first</span>
        </button>
      )}
    </div>
  );
}

const mint = () => {
  console.log("hello!");
};
