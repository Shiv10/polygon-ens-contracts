// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;
import "hardhat/console.sol";

contract Domains {

    mapping (string => address) public domains;

    constructor () {
        console.log("This is the start of the domains contract.");
    }

    function register(string calldata name) public {
        domains[name] = msg.sender;
        console.log("%s has regitered the domain: %s", msg.sender, name);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }
}