import { useMetaMask } from "metamask-react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getETHStorageContract, getMasterTokenContract } from "../lib/utils";

export function ConvertTokenComp() {
  const { status, ethereum, account } = useMetaMask();
  const [tx, setTx] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function getBal() {
      const balance = await getBalance(ethereum, account);
      const formattedBalance = ethers.utils.formatEther(balance);
      setBalance(formattedBalance);
    }
    if (status === "connected") {
      getBal();
    }
  });

  return (
    <div>
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto">
          <p className="font-mono text-lg font-bold text-gray-800 pr-5">
            Get Master Token from deposit
          </p>
          <p className="space-x-2 text-sm font-medium text-gray-500">
            <span>Master Token balance: {balance}</span>
          </p>
        </div>
        {status === "connected" ? (
          <button
            className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 hover:bg-sky-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            onClick={async () => {
              const id = await convert(ethereum);
              console.log(id.hash);
              setTx(id.hash);
            }}
          >
            Convert
          </button>
        ) : (
          <button className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
            Convert
            <span className="tooltiptext">Connect your wallet first</span>
          </button>
        )}
      </div>
      {tx && (
        <p className="space-x-2 text-sm font-medium text-gray-500">
          <span>Transaction id: {tx}</span>
        </p>
      )}
    </div>
  );
}

const convert = (ethereum: any): Promise<any> => {
  console.log("wtf");
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  const signer = contract.connect(provider.getSigner());
  return signer.buyMaster();
};

const getBalance = (ethereum: any, account: string | null): Promise<any> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getMasterTokenContract(provider);
  return contract.balanceOf(account);
};
