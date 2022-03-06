import Head from "next/head";

import { SendEtherComp } from "../components/send-ether";
import { MetaMaskProvider } from "metamask-react";
import { ConnectWalletComp } from "../components/connect-wallet";
import { MintNftComp } from "../components/mint-nft";
import { ConvertTokenComp } from "../components/convert-token";
import { NFTLink } from "../components/nft-link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Application</title>
        <meta
          name="App for depositing ether to smart contract and minting an NFT token"
          content="..."
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-6">
        <MetaMaskProvider>
          <ConnectWalletComp></ConnectWalletComp>
          <SendEtherComp></SendEtherComp>
          <ConvertTokenComp></ConvertTokenComp>
          <MintNftComp></MintNftComp>
          <NFTLink></NFTLink>
        </MetaMaskProvider>
      </div>
    </div>
  );
}
