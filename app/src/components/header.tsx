import { ConnectWallet } from "./connect-wallet";

interface Props {
  choice: any;
}
export function Header({ choice }: Props) {
  return (
    <nav id="header" className="fixed w-full z-10 top-2">
      <div className="w-full md:max-w-3xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
        <div
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20"
          id="nav-content"
        >
          <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 w-full">
            <div className="text-left flex items-center text-xl">
              Web3 Application
            </div>
            <div className="w-full flex items-center grid-cols-2">
              <button
                className="justify-center w-full relative inline-flex items-center  border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => choice("swap")}
              >
                Swap
              </button>
              <button
                className="justify-center w-full relative inline-flex items-center  border-b-2  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => choice("mint")}
              >
                Mint
              </button>
            </div>
            <div className="text-right">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
