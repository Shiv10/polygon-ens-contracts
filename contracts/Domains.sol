// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;
import "hardhat/console.sol";

contract Domains {

    mapping (string => address) public domains;
    mapping (string => string ) public records;

    constructor () {
        console.log("This is the start of the domains contract.");
    }

    function register(string calldata name) public {
        require(domains[name]==address(0), "Domain already registered");
        domains[name] = msg.sender;
        console.log("%s has regitered the domain: %s", msg.sender, name);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        require(domains[name]==msg.sender, "You are not the owner of the domain.");
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}