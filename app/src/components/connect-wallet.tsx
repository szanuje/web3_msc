import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  chain,
} from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const MTKN_ADDRESS = process.env.REACT_APP_MTKN_ADDRESS as string;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ConnectWallet() {
  const { data: account, isLoading: accountLoading } = useAccount();
  const { connect, isConnecting } = useConnect({
    connector: new MetaMaskConnector({ chains: [chain.rinkeby] }),
  });
  const { disconnect } = useDisconnect();

  const { data: mtknBalance } = useBalance({
    addressOrName: account?.address,
    token: MTKN_ADDRESS,
    watch: true,
    cacheTime: 7_000,
    enabled: !!account && !accountLoading,
  });

  const { data: ethBalance } = useBalance({
    addressOrName: account?.address,
    watch: true,
    cacheTime: 7_000,
    enabled: !!account && !accountLoading,
  });

  if (account)
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {formatAddress(account?.address)}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-fit">
            <div className="space-y-1">
              <Menu.Item>
                {({ active }) => (
                  <div className="text-gray-700 block px-4 py-2 text-sm float-right w-max">
                    ETH balance:{" "}
                    {ethBalance
                      ? parseFloat(ethBalance.formatted).toFixed(4)
                      : 0}
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="text-gray-700 block px-4 py-2 text-sm float-right w-max">
                    Token balance:{" "}
                    {mtknBalance
                      ? parseFloat(mtknBalance.formatted).toFixed(4)
                      : 0}
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? " text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm float-right focus:outline-none"
                    )}
                    onClick={() => disconnect()}
                  >
                    Disconnect wallet
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );

  if (isConnecting)
    return (
      <button
        disabled
        className="relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <svg
          role="status"
          className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Connecting...
      </button>
    );
  return (
    <button
      onClick={() => connect()}
      className="relative -ml-px inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    >
      Connect wallet
    </button>
  );
}

const formatAddress = (address: string | undefined) => {
  if (!address) return "0x0";
  return address.slice(0, 7) + "..." + address.slice(-5);
};
