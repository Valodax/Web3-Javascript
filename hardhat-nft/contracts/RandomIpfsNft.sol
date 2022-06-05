// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract RandomIpfsNft {
    // when we mint an nft, we will trigger a chainlink vrf call to get us a random number
    // using that number, we will get a random nft
    // it will be either a pug, shiba inu or st bernard
    // pug = super rare
    // shiba = medium
    // st bernard = common

    // users have to pay to mint an NFT
    // the owner of the contract can withdraw the ETH

    function requestNft() public {}

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal {}

    function tokenURI(uint256) public {}
}
