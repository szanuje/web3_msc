import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { getETHStorageContract } from "../lib/utils";

export function SendEtherComp() {
  const { status, ethereum, account } = useMetaMask();
  const [amount, setAmount] = useState("");
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
            Deposit Ether:
          </p>
          <p className="space-x-2 text-sm font-medium text-gray-500">
            <span>Deposit balance: {balance}</span>
          </p>
        </div>
        <input
          className="w-96 -ml-px items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          placeholder="amount"
          onChange={(i) => setAmount(i.target.value)}
        ></input>
        {status === "connected" ? (
          <button
            className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 hover:bg-sky-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            onClick={async () => {
              const id = await deposit(amount, ethereum);
              console.log(id.hash);
              setTx(id.hash);
            }}
          >
            Deposit
          </button>
        ) : (
          <button className="w-24 justify-center relative -ml-px inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
            Deposit
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

const deposit = (amount: string, ethereum: any): Promise<any> => {
  if (amount === "") return new Promise(() => "Amount must not be empty");

  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  const signer = contract.connect(provider.getSigner());
  const options = { value: ethers.utils.parseEther(amount) };
  return signer.deposit(options);
};

const getBalance = (ethereum: any, account: string | null): Promise<any> => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = getETHStorageContract(provider);
  return contract.depositBalance(account);
};
