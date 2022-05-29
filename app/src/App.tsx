import { MintNft } from "./components/mint-nft";
import { Swap } from "./components/swap-token";
import { Header } from "./components/header";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Greeting } from "./components/greeting";
import { IncorrectChainModal } from "./components/incorrect-chain-modal";
import { WagmiConfig } from "wagmi";
import { wagmiClient } from "./lib/wagmi";

function App() {
  const [choice, setChoice] = useState();

  return (
    <div>
      <header>
        <title>Web3 Application</title>
        <meta
          name="App for depositing ether to smart contract and minting an NFT token"
          content="..."
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </header>

      <WagmiConfig client={wagmiClient}>
        <Header choice={setChoice} />
        <div className="fixed w-full top-48">
          <div className="w-full md:max-w-3xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
            <div className="w-full flex justify-center space-y-6 table-column">
              {choice === "swap" && <Swap />}
              {choice === "mint" && <MintNft />}
              {choice !== "swap" && choice !== "mint" && <Greeting />}
            </div>
          </div>
        </div>
        <Toaster position="bottom-left" />
        <IncorrectChainModal />
      </WagmiConfig>
    </div>
  );
}

export default App;
