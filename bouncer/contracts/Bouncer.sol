pragma solidity ^0.4.21;

contract Bouncer {
    mapping(address => bool) public accessAllowance;
    address public owner;
    // Array with all address ids, used for enumeration
    address[] public allowedAddresses;

    // Events
    event AccessAllowed(address allower, address allowedAddress);
    event AccessRevoked(address allower, address revokedAddress);

    // Mapping from address to position in the allowedAddresses array
    mapping(address => uint256) internal allowedAddressesIndex;

    function constructor() public {
        owner = msg.sender;
    }

    modifier onlyAllowed() {
        require(msg.sender == owner);
    _;
  }

    function checkAccess(address incomingPerson) public view returns (bool) {
        return accessAllowance[incomingPerson];
    }

    function totalAccesses() public view returns (uint256) {
        return allowedAddresses.length;
  }

    function giveAccess(address incomingPerson) public onlyAllowed {
        // Change mapping to allow access
        accessAllowance[incomingPerson] = true;
        // Add new address to allowedAddresses array
        allowedAddressesIndex[incomingPerson] = allowedAddresses.length;
        allowedAddresses.push(incomingPerson);
        // Emit event
        emit AccessAllowed(msg.sender, incomingPerson)
    }

    function revokeAccess(address incomingPerson) public onlyAllowed {
        // Change mapping to revoke access
        accessAllowance[incomingPerson] = false;

        // Reorg allowedAddresses array
        uint256 addressIndex = allowedAddressesIndex[incomingPerson];
        uint256 lastAddressIndex = allowedAddresses.length - 1;
        address lastAddress = allowedAddresses[lastAddressIndex];

        allowedAddresses[addressIndex] = lastAddress;
        delete allowedAddresses[lastAddressIndex];
        allowedAddresses.length--;

        allowedAddressesIndex[incomingPerson] = 0;
        allowedAddressesIndex[lastAddress] = addressIndex;

        // Emit event
        emit AccessRevoked(msg.sender, incomingPerson)
    }

}
