// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sender is Ownable {

    mapping(address => mapping(address => uint)) private ownersToTokensToValues;
    address[] tokens;

    constructor() {
        transferOwnership(tx.origin);
    }

    function bulkSend(address payable[] memory to) public payable {
        uint value = msg.value / to.length;
        for (uint i; i < to.length; i++) {
            require(to[i].send(value), "Not possible to send");
        }
    }

    function bulkSendERC20(address[] memory to, address token, uint _value) public {
        uint value = _value / to.length;
        for (uint i; i < to.length; i++) {
            ownersToTokensToValues[to[i]][token] += value;
        }
    }

    function withdraw() public {
        mapping(address => uint) storage tokensToValues = ownersToTokensToValues[msg.sender];
        for (uint i; i < tokens.length; i++) {
            address token = tokens[i];
            uint value = tokensToValues[token];
            tokensToValues[token] = 0;
            if (token != address(0)) {
                IERC20(token).transfer(msg.sender, value);
            } else {
                payable(msg.sender).transfer(value);
            }
        }
    }

    function _withdraw() public onlyOwner {
        for (uint i; i < tokens.length; i++) {
            address token = tokens[i];
            uint value;
            if (token != address(0)) {
                value = IERC20(token).balanceOf(address(this));
                IERC20(token).transfer(msg.sender, value);
            } else {
                value = address(this).balance;
                payable(msg.sender).transfer(value);
            }
        }
    }
}