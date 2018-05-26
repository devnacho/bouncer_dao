pragma solidity ^0.4.22

contract Bouncer {
    mapping(address => bool) public accessAllowance;
    address public owner;

    function constructor() public {
        owner = msg.sender
    }

    modifier onlyAllowed() {
    require(msg.sender == owner);
    _;
  }

    function giveAccess(address incomingPerson) public onlyAllowed returns bool {
        accessAllowance[incomingPerson] = true;
        return true;
    }

    function revokeAccess(address incomingPerson) public onlyAllowed returns bool {
        accessAllowance[incomingPerson] = false;
        return true;
    }
