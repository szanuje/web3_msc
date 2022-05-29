import { ethers } from "ethers";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount, useContractWrite, useSigner, useBalance } from "wagmi";
import mainABI from "../abi/MainContract.json";

const MAIN_ADDRESS = process.env.REACT_APP_MAIN_ADDRESS as string;
const txUrl = "https://etherscan.io/tx";

export function Swap() {
  const { data: signer } = useSigner();
  const { data: account, isLoading: accountLoading } = useAccount();

  const { data: ethBalance } = useBalance({
    addressOrName: account?.address,
    watch: true,
    cacheTime: 7_000,
    enabled: account && !accountLoading,
  });

  const [sliderVal, setSliderVal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const { write: swap } = useContractWrite(
    {
      addressOrName: MAIN_ADDRESS,
      contractInterface: mainABI,
      signerOrProvider: signer,
    },
    "swapExactETHForToken",
    {
      args: [],
      overrides: { value: ethers.utils.parseEther(amount.toString()) },
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

  return (
    <div className="flex flex-col items-start justify-between w-full px-10 lg:flex-row">
      <div className="relative z-10 w-full max-w-3xl mt-20 lg:mt-0">
        <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
          <h4 className="w-full text-xl font-medium leading-snug">
            Swap ether for token
          </h4>
          <div className="relative w-full mt-6 space-y-8">
            <div className="relative w-full">
              <div className="absolute right-2 top-3 inline-block px-2 py-2 text-xl text-xs font-medium text-center transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 ease">
                {ethBalance ? parseFloat(ethBalance.formatted).toFixed(4) : 0}{" "}
                ETH
              </div>

              <label className="absolute px-2 ml-2 -mt-3 font-medium text-gray-600 bg-white">
                ETH
              </label>
              <input
                type="number"
                readOnly
                className="block w-full px-4 py-4 mt-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                value={amount}
              />
              <div className="slider-parent">
                <input
                  type="range"
                  min={0}
                  max={ethBalance ? parseFloat(ethBalance.formatted) * 1000 : 0}
                  value={sliderVal}
                  list="newlist"
                  style={{ width: "100%", height: "1px" }}
                  onChange={({ target: { value: radius } }) => {
                    setSliderVal(parseInt(radius));
                    setAmount(parseInt(radius) / 1000);
                  }}
                  onClick={() =>
                    !ethBalance ||
                    (parseFloat(ethBalance.formatted) === 0 &&
                      toast.error("You need to have at least some ether"))
                  }
                />
              </div>
              <p className="mt-2 font-medium text-gray-600 bg-white">
                Receive amount: 69.420
              </p>
            </div>

            <div>
              <button
                className="inline-block w-full px-5 py-4 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease"
                onClick={async () => {
                  if (!account) {
                    toast.error("Connect your wallet");
                    return;
                  }
                  try {
                    const balance = parseFloat(ethBalance?.formatted || "0");

                    if (balance < amount) {
                      toast.error("Insufficient balance");
                      return;
                    }
                    if (amount === 0) {
                      toast.error("Bad input");
                      return;
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("Bad input");
                  }
                  swap();
                }}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
