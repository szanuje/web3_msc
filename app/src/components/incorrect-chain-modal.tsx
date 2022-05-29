import { LoadingSpinner } from "./loading-spinner";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNetwork } from "wagmi";

export const IncorrectChainModal = () => {
  const { activeChain, switchNetworkAsync, isLoading } = useNetwork();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!activeChain) return;

    if (activeChain.unsupported) {
      setOpen(true);
    }
  }, [activeChain]);

  const handleSwitchNetwork = () => {
    if (switchNetworkAsync) {
      switchNetworkAsync(4).then(() => setOpen(false));
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={() => setOpen(!open)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/50 transition" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 sm:align-middle md:p-12">
              <div className="space-y-6">
                <div className="space-y-3 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-black text-blue-500 md:text-2xl lg:text-3xl"
                  >
                    Chain not supported
                  </Dialog.Title>
                  <p className="text-lg text-gray-500">
                    You must switch to Rinkeby chain.
                  </p>
                  <button
                    className="inline-flex h-12 w-full items-center justify-center space-x-3 rounded-2xl border-2 border-dashed px-6 py-3 text-center text-base font-medium transition-colors focus:outline-none"
                    onClick={handleSwitchNetwork}
                  >
                    {isLoading && <LoadingSpinner className="h-5" />}
                    {!isLoading && <span>Switch network</span>}
                    {isLoading && <span>Please confirm</span>}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
