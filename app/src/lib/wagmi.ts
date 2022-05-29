import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [publicProvider()]
);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
});
