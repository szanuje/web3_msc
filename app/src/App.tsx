import { MintNft } from "./components/mint-nft";
import { Swap } from "./components/swap-token";
import { Header } from "./components/header";
import { Toaster } from "react-hot-toast";
import { Provider, createClient } from "wagmi";
import { useState } from "react";

const client = createClient({
  autoConnect: true,
});

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

      <Provider client={client}>
        <Header choice={setChoice} />
        <div className="fixed w-full top-48">
          <div className="w-full md:max-w-3xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
            <div className="w-full flex justify-center space-y-6 table-column">
              {renderElem(choice)}
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </Provider>
    </div>
  );
}

const renderElem = (choice: string | undefined) => {
  if (choice === "swap") return <Swap />;
  if (choice === "mint") return <MintNft />;
  return (
    <h1 className="text-3xl text-center">
      Welcome! Connect your wallet and start minting NFTs...
    </h1>
  );
};

export default App;
