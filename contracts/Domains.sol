// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;
import "hardhat/console.sol";
import { StringUtils } from "./libraries/StringUtils.sol";

contract Domains {

    string public tld;
    mapping (string => address) public domains;
    mapping (string => string ) public records;

    constructor (string memory _tld) {
        tld = _tld;
        console.log("This is the start of the domains contract.");
    }

    function price (string calldata name) public pure returns (uint256) {
        uint len = StringUtils.strlen(name);
        if (len==3) {
            return 5*10**16;
        } else if (len==4) {
            return 3*10**16;
        } else {
            return 1*10**16;
        }
    }

    function register(string calldata name) public payable {
        require(domains[name]==address(0), "Domain already registered");

        uint _price = price(name);
        require(msg.value >= _price, "Not enough Matic paied");

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