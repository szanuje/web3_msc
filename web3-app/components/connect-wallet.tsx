import { useMetaMask } from "metamask-react";

export function ConnectWalletComp() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return (
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto space-y-0.5">
          <p className="font-mono text-lg font-bold text-gray-800">
            Synchronisation with MetaMask ongoing...
          </p>
        </div>
      </div>
    );

  if (status === "unavailable")
    return (
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto space-y-0.5">
          <p className="font-mono text-lg font-bold text-gray-800">
            Metamask wallet is not available. Please install it.
          </p>
        </div>
      </div>
    );

  if (status === "notConnected")
    return (
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto space-y-0.5">
          <p className="font-mono text-lg font-bold text-gray-800">
            Wallet is not connected.
          </p>
        </div>
        <button
          onClick={connect}
          className="relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        >
          Connect wallet
        </button>
      </div>
    );

  if (status === "connecting")
    return (
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto space-y-0.5">
          <p className="font-mono text-lg font-bold text-gray-800">
            Connecting...
          </p>
        </div>
        <button className="relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 focus:z-10">
          Connecting...
        </button>
      </div>
    );

  if (status === "connected")
    return (
      <div className="min-w-[700px] flex items-center justify-between rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <div className="mr-auto space-y-0.5">
          <p className="font-mono text-lg font-bold text-gray-800">
            Connected: {account}
          </p>

          <p className="space-x-2 text-sm font-medium text-gray-500">
            <span>{getChain(chainId)}</span>
          </p>
        </div>
      </div>
    );

  return null;
}

const getChain = (chainIdHex: string | null): string => {
  if (chainIdHex == null) return "Unknown";
  let id;
  try {
    id = parseInt(chainIdHex, 16);
  } catch (err) {
    return "Unknown";
  }
  if (id === 1) return "Ethereum: Mainnet";
  if (id === 3) return "Ethereum: Ropsten";
  if (id === 4) return "Ethereum: Rinkeby";
  if (id === 5) return "Ethereum: Goerli";
  if (id === 42) return "Ethereum: Kovan";
  return "Unknown";
};
