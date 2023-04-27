// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sender {

    function bulkSend(address payable[] memory to) public payable {
        uint value = msg.value / to.length;
        for (uint i; i < to.length; i++) {
            require(to[i].send(value), "Not possible to send");
        }
    }

    function bulkSendERC20(address[] memory to, ERC20 token, uint _value) public {
        uint value = _value / to.length;
        for (uint i; i < to.length; i++) {
            token.transferFrom(msg.sender, to[i], value);
        }
    }
}