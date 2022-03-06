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

### How to use

- compile: `npm run compile`
- deploy: `npm run deploy-[local|rinkeby]`
