// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BulkSender is Ownable {

    mapping(address => mapping(address => uint)) private ownersToTokensToValues;
    mapping(address => bool) private tokensToIsAdded;
    address[] tokens;

    constructor() {
        transferOwnership(tx.origin);
    }

    function bulkSend(address[] memory to) public payable {
        rememberOwners(to, address(0), msg.value);
    }

    function bulkSendERC20(address[] memory to, address token, uint value) public {
        rememberOwners(to, token, value);
        IERC20(token).transferFrom(msg.sender, address(this), value);
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

    function rememberOwners(address[] memory to, address token, uint _value) private {
        uint value = _value / to.length;
        for (uint i; i < to.length; i++) {
            rememberToken(token);
            ownersToTokensToValues[to[i]][token] += value;
        }
    }

    function rememberToken(address token) private {
        if (!tokensToIsAdded[token]) {
            tokensToIsAdded[token] = true;
            tokens.push(token);
        }
    }
}