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
              <a
                href="/"
                className=" transition ease-in-out hover:scale-[1.05] duration-200"
              >
                {home}
              </a>
            </div>
            <div className="w-full flex items-center grid-cols-2 space-x-1">
              <button
                className="justify-center w-full relative inline-flex items-center border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition ease-in-out hover:scale-[1.05] duration-200"
                onClick={() => choice("swap")}
              >
                Swap
              </button>
              <button
                className="justify-center w-full relative inline-flex items-center border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition ease-in-out hover:scale-[1.05] duration-200"
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

const home = (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ></path>
  </svg>
);
