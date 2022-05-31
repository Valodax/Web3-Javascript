// Raffle
// Enter the lottery (paying some amount)
// Pick a random winner (verifiably random)
// Winner to be randomly selected every X minutes
// Chainlink Oracle -> Randomness, Automated Execution (Chainlink Keepers)

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

error Raffle__NotEnoughETHEntered();

contract Raffle {
    /* State Variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        // require (msg.value > i_entranceFee, "Not enough ETH!")
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        // Emit an event when we update a dynamic array or mapping
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function pickRandomWinner() private returns (address) {
        
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
