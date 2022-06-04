//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20 {
  // initial supply is '50' <- 50 Wei
  // initial supply is 50e18
  // 50*10**18
  constructor(uint256 initialSupply) ERC20("Mitchell", "MHS") {
    _mint(msg.sender, initialSupply);
  }
}
