export function Greeting() {
  const title = "Welcome to Web3 application";
  const subtitle = "Swap your tokens and mint your first NFT!";

  return (
    <div className="-mt-38 flex flex-1 flex-col items-center justify-center py-6">
      <div className="mx-auto max-w-4xl px-6">
        <div className="space-y-3 py-6 text-center md:py-12">
          <h1 className="text-3xl font-black leading-loose text-gray-900 md:text-5xl">
            {title}
          </h1>
          <p className="text-xl text-gray-500">{subtitle}</p>
          <div className="relative"></div>
        </div>
      </div>
    </div>
  );
}
