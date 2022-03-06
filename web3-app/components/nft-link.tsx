import { useMetaMask } from "metamask-react";

export function NFTLink() {
  const { status, account } = useMetaMask();

  const nftUrl = `https://testnets.opensea.io/${account}`;

  return status === "connected" ? (
    <div className="bg-gray-200 rounded-md space-y-1.5">
      <p>
        See the MasterNFT collection at:{" "}
        <a
          className="text-sky-500"
          href="https://testnets.opensea.io/collection/masternft-noxd9barez"
        >
          https://testnets.opensea.io/collection/masternft-noxd9barez
        </a>
      </p>
      <p>
        See your MasterNFT collection at:{" "}
        <a className="text-sky-500" href={nftUrl}>
          {nftUrl}
        </a>
      </p>
    </div>
  ) : null;
}
