# web3_msc project

This project consists of a web3 application that interact with smart contracts.

## web3-app

This is a client application that interacts with deployed smart contracts.

### Tech stack

- next.js
- react.js
- tailwind css
- ethers.js

### Functionalities

- deposit Ether into the contract
- convert Ether to a new token
- mint an NFT token

### How to use

- `npm run dev`

## eth

This directory contains code for smart contracts to interact with.

### Tech stack

- solidity
- hardhat

### Functionalities

- ERC20 token contract
- ERC721 token contract
- Contract that uses the above and provides additional functionalities  
  -- Deposit Ether  
  -- Convert Ether into ERC20 Token  
  -- Mint an NFT for that token

### How to use

- compile: `npm run compile`
- deploy: `npm run deploy-[local|rinkeby]`
- verify: `npx hardhat verify --network rinkeby $ADDRESS`

### Contracts deployed to Ethereum Rinkeby network

- ETHStorage: `0xCfCFA75475f2462D28dB2964Db8ac2F375230038`  
  [https://rinkeby.etherscan.io/address/0xCfCFA75475f2462D28dB2964Db8ac2F375230038](https://rinkeby.etherscan.io/address/0xCfCFA75475f2462D28dB2964Db8ac2F375230038)
- Master Token (MTKN): `0xf17E09B60f278933f498c03a7B3fdFA0eB4C0FDb`  
  [https://rinkeby.etherscan.io/address/0xf17e09b60f278933f498c03a7b3fdfa0eb4c0fdb](https://rinkeby.etherscan.io/address/0xf17e09b60f278933f498c03a7b3fdfa0eb4c0fdb)
- MasterNFT (MNFT): `0x6ae3afeeDc48AA7dC2Cb0C6e1Ab6E15c2fb779d1`  
  https://rinkeby.etherscan.io/address/0x6ae3afeedc48aa7dc2cb0c6e1ab6e15c2fb779d1
- Price oracle (ETH/USD): `0x52E94964AD2A41db15EBfd4BE8C5b51d1E83B4CB`  
  [https://rinkeby.etherscan.io/address/0x52e94964ad2a41db15ebfd4be8c5b51d1e83b4cb](https://rinkeby.etherscan.io/address/0x52e94964ad2a41db15ebfd4be8c5b51d1e83b4cb)
