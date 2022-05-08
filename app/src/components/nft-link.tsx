export function NFTLink() {
  const nftUrl = `https://testnets.opensea.io/`;

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
