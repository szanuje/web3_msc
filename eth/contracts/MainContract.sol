// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {MasterToken} from "./MasterToken.sol";
import {MasterNFT} from "./MasterNFT.sol";
import {Swap} from "./Swap.sol";

contract MainContract {
    MasterToken public immutable mtkn;
    MasterNFT public immutable mnft;
    Swap public immutable swapper;

    event Swapped(uint256 amountIn, uint256 amountOut);
    event Minted(uint256 id, string uri);

    constructor(
        address mtknAddress,
        address mnftAddress,
        address payable swapAddress
    ) {
        mtkn = MasterToken(mtknAddress);
        mnft = MasterNFT(mnftAddress);
        swapper = Swap(swapAddress);
    }

    function swapExactETHForToken() public payable {
        uint256 amountOut = swapper.swapExactInputSingle{value: msg.value}();
        emit Swapped(msg.value, amountOut);
    }

    function mintMasterNFT(string memory tokenUri) public returns (uint256) {
        mtkn.transferFrom(
            msg.sender,
            address(this),
            1000 * 1000000000000000000
        );
        uint256 id = mnft.mintNFT(msg.sender, tokenUri);
        emit Minted(id, tokenUri);
        return id;
    }

    receive() external payable {}
}
