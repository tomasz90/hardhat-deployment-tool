// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sender {

    function send(address payable[] memory to) public payable {
        uint value = msg.value / to.length;
        for(uint i; i < to.length; i++) {
            require(to[i].send(value), "Not possible to send");
        }
    }

    function sendERC20(address[] memory to, ERC20 token, uint _value) public {
        for(uint i; i < to.length; i++) {
            uint value = _value / to.length;
            token.transferFrom(msg.sender, to[i], value);
        }
    }
}