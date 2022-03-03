// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {MasterToken} from "./MasterToken.sol";
import {MasterNFT} from "./MasterNFT.sol";

/**
 * @title ETHStorage
 * @dev Store & retrieve ETH
 */
contract ETHStorage {
    address private constant UNISWAP_ROUTER_ADDRESS =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant RINKEBY_DAI =
        0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735;
    uint256 private constant MINT_QUANTITY = 100000000000000000000000;

    mapping(address => uint256) private deposits;

    MasterToken public mtkn;
    MasterNFT public mnft;

    event Bought(uint256 amount);
    event Withdrawn(uint256 amount);
    event Minted(uint256 id);

    constructor() {
        mtkn = new MasterToken(MINT_QUANTITY);
        mnft = new MasterNFT();
    }

    function buyMaster() public payable {
        uint256 balance = deposits[msg.sender];
        require(balance > 0, "You must deposit some Ether");
        uint256 withdrawAmount = 3000 * balance;
        uint256 supplyBalance = mtkn.balanceOf(address(this));

        if (supplyBalance < withdrawAmount) {
            mtkn.mint(withdrawAmount * 100);
        }

        mtkn.transfer(msg.sender, withdrawAmount);
        emit Bought(withdrawAmount);
    }

    function mintMasterNFT(string memory tokenUri)
        public
        payable
        returns (uint256)
    {
        mtkn.transferFrom(
            msg.sender,
            address(this),
            1000 * 1000000000000000000
        );
        return mnft.mintNFT(msg.sender, tokenUri);
    }

    function tokenBalance() public view returns (uint256) {
        return mtkn.balanceOf(msg.sender);
    }

    function deposit() public payable {
        deposits[msg.sender] += msg.value;
    }

    function depositBalance() public view returns (uint256) {
        return deposits[msg.sender];
    }

    receive() external payable {}
}
