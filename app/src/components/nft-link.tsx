export function NFTLink({ address }: { address: string }) {
  const url = `https://testnets.opensea.io`;

  return (
    <div className="relative z-10 w-full max-w-3xl mt-20 lg:mt-0">
      <div className="relative z-10 flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
        <h4 className="w-full text-xl font-medium leading-snug">
          See your NFT collections at{" "}
          <a
            className="text-blue-500"
            href={`${url}/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenSea.io
          </a>
        </h4>
      </div>
    </div>
  );
}
