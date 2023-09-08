// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct SwapDescription {
    IERC20 srcToken;
    IERC20 dstToken;
    address srcReceiver;
    address dstReceiver;
    uint256 amount;
    uint256 minReturnAmount;
    uint256 flags;
    bytes permit;
}

contract OneInchProxy is Ownable {

    OneInch public oneInch;

    IERC20[] public stables;

    constructor(address _router) {
        oneInch = OneInch(_router);
    }

    function swap(address caller, SwapDescription memory desc, bytes memory data) external onlyOwner {

        require(desc.dstReceiver == owner(), "Receiver is not the owner.");

        bool contains;
        for (uint256 i = 0; i < stables.length; i++) {
            if (stables[i] == desc.dstToken) {
                contains = true;
                break;
            }
        }

        require(contains, "Token not supported.");

        uint256 dstBalance = desc.dstToken.balanceOf(owner());

        desc.srcToken.transferFrom(owner(), address(this), desc.amount);
        desc.srcToken.approve(address(oneInch), desc.amount);

        oneInch.swap(caller, desc, data);

        require(dstBalance != desc.dstToken.balanceOf(owner()), "Balance of dst token didn't change.");
    }

    function removeStable(IERC20 token) external onlyOwner {
        for (uint256 i = 0; i < stables.length; i++) {
            if (stables[i] == token) {
                stables[i] = stables[stables.length - 1];
                stables.pop();
                break;
            }
        }
    }

    function addStable(IERC20 token) external onlyOwner {
        stables.push(token);
    }
}

interface OneInch {

    function swap(
        address caller,
        SwapDescription calldata desc,
        bytes calldata data
    )
    external
    payable
    returns (uint256 returnAmount, uint256 gasLeft);
}