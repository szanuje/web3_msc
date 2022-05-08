import { useState } from "react";

export function MintNft() {
  const [url, setUrl] = useState("");

  return (
    <div className="flex flex-col items-start justify-between w-full px-10 lg:flex-row">
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
                  // if (!account) {
                  //   toast.error("Connect your wallet");
                  //   return;
                  // }
                  // toast.promise(
                  //   deposit(amount, null),
                  //   {
                  //     loading: "Processing transaction",
                  //     success: (tx) => (
                  //       <div className="space-x-1 inline-flex">
                  //         <p>Transaction sent:</p>
                  //         <a className="text-sky-500" href={`${txUrl}/${tx}`}>
                  //           Etherscan
                  //         </a>
                  //       </div>
                  //     ),
                  //     error: (e) => {
                  //       console.error(e);
                  //       return "Transaction failed";
                  //     },
                  //   },
                  //   {
                  //     duration: 8000,
                  //   }
                  // );
                }}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
