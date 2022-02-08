// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ETHStorage
 * @dev Store & retrieve ETH
 */
contract ETHStorage {
    mapping(address => uint256) private addressToAmountFunded;

    function fund() public payable {
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return addressToAmountFunded[msg.sender];
    }
}
