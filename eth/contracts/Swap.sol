// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IQuoter.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";

contract Swap {
    address private constant SWAP_ROUTER =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;
    address private constant FACTORY =
        0x1F98431c8aD98523631AE4a59f267346ea31F984;
    address private constant WETH = 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    ISwapRouter private immutable swapRouter;
    IUniswapV3Factory private immutable factory;

    address public immutable tokenAddress;

    constructor(address token) {
        swapRouter = ISwapRouter(SWAP_ROUTER);
        factory = IUniswapV3Factory(FACTORY);
        tokenAddress = token;
    }

    function swapExactInputSingle() external payable returns (uint256) {
        require(msg.value > 0, "Must pass non 0 ETH amount");
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: WETH,
                tokenOut: tokenAddress,
                fee: 10000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: msg.value,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        return swapRouter.exactInputSingle{value: msg.value}(params);
    }

    function poolAddress() public view returns (address) {
        return factory.getPool(WETH, tokenAddress, 10000);
    }

    receive() external payable {}
}
