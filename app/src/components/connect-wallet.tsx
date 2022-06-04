import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import toast from "react-hot-toast";
import { LoadingSpinner } from "./loading-spinner";

const MTKN_ADDRESS = process.env.REACT_APP_MTKN_ADDRESS as string;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ConnectWallet() {
  const { data: account, isLoading: accountLoading } = useAccount();
  const { connect, isConnecting, connectors } = useConnect({
    onConnect: (data) => {
      toast.success(`Connected ${data?.connector?.name} successfully`);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const { disconnect } = useDisconnect();

  const { data: mtknBalance } = useBalance({
    addressOrName: account?.address,
    token: MTKN_ADDRESS,
    watch: true,
    cacheTime: 7_000,
    enabled: account && !accountLoading,
  });

  const { data: ethBalance } = useBalance({
    addressOrName: account?.address,
    watch: true,
    cacheTime: 7_000,
    enabled: account && !accountLoading,
  });

  return (
    <>
      {account && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="justify-center w-full relative inline-flex items-center border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition ease-in-out hover:scale-[1.05] duration-200">
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
      )}
      {isConnecting && (
        <button
          disabled
          className="justify-center relative inline-flex items-center border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 rounded-lg space-x-1"
        >
          <LoadingSpinner className="w-5 h-5" />
          <span>Connecting...</span>
        </button>
      )}
      {!account && !isConnecting && (
        <button
          onClick={() => connect(connectors[0])}
          className="justify-center relative inline-flex items-center border-b-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition ease-in-out hover:scale-[1.05] duration-200"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}

const formatAddress = (address: string | undefined) => {
  if (!address) return "0x0";
  return address.slice(0, 7) + "..." + address.slice(-5);
};
