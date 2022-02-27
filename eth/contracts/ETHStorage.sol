// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC20, MasterToken} from "./MasterToken.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

/**
 * @title ETHStorage
 * @dev Store & retrieve ETH
 */
contract ETHStorage {
    address internal constant UNISWAP_ROUTER_ADDRESS =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private rinkebyDaiStablecoin =
        0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735;
    uint256 private constant MINT_QUANTITY = 100000000000000000000000;

    mapping(address => uint256) private deposits;
    IERC20 public token;
    IUniswapV2Router02 public uniswapRouter;

    event Bought(uint256 amount);
    event Sold(uint256 amount);
    event Withdrawn(uint256 amount);

    constructor() {
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
        token = new MasterToken(MINT_QUANTITY);
    }

    function buyToken() public payable {
        uint256 amountToBuy = msg.value / 1000000000000000;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountToBuy > 0, "You need to send some ether");
        require(amountToBuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountToBuy);
        emit Bought(amountToBuy);
    }

    function sellToken(uint256 amount) public payable {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount * 1000000000000000);
        emit Sold(amount);
    }

    function contractTokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function tokenBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }

    function deposit() public payable {
        deposits[msg.sender] += msg.value;
    }

    function depositBalance() public view returns (uint256) {
        return deposits[msg.sender];
    }

    function withdrawDepositInDai() public payable {
        uint256 balance = deposits[msg.sender];
        uint256 daiPerEth = getEstimatedDaiForEth()[0];
        uint256 withdrawAmount = balance * daiPerEth;
        uint256 withdrawAmountTaxed = (withdrawAmount * 98) / 100;
        convertEthToDai(balance, withdrawAmountTaxed, msg.sender);
        deposits[msg.sender] = 0;
        emit Withdrawn(withdrawAmountTaxed);
    }

    function convertEthToDai(
        uint256 ethAmount,
        uint256 daiAmount,
        address receiver
    ) private {
        uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
        uniswapRouter.swapETHForExactTokens{value: ethAmount}(
            daiAmount,
            getPathForETHtoDAI(),
            receiver,
            deadline
        );

        // refund leftover ETH to user
        //(bool success, ) = msg.sender.call{value: address(this).balance}("");
        // require(success, "refund failed");
    }

    function getEstimatedDaiForEth() public view returns (uint256[] memory) {
        return uniswapRouter.getAmountsIn(1, getPathForDaiToEth());
    }

    function getPathForETHtoDAI() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = rinkebyDaiStablecoin;
        return path;
    }

    function getPathForDaiToEth() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = rinkebyDaiStablecoin;
        path[1] = uniswapRouter.WETH();
        return path;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
