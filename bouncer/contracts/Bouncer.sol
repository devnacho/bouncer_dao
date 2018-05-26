pragma solidity ^0.4.18;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract Bouncer is AragonApp {
    int public value;
    mapping(address => bool) public accessAllowance;

    // Array with all address ids, used for enumeration
    address[] public allowedAddresses;

    // Mapping from address to position in the allowedAddresses array
    mapping(address => uint256) internal allowedAddressesIndex;

    // Events
    event AccessAllowed(address allower, address allowedAddress);
    event AccessRevoked(address revoker, address revokedAddress);

    // ACL
    bytes32 constant public ALLOW_ROLE = keccak256("ALLOW_ROLE");
    bytes32 constant public REVOKE_ROLE = keccak256("REVOKE_ROLE");

    function Bouncer() public {
       value = 0;
    }

    function checkAccess(address incomingPerson) public view returns (bool) {
        return accessAllowance[incomingPerson];
    }

    function totalAccesses() public view returns (uint256) {
        return allowedAddresses.length;
  }

    function giveAccess(address incomingPerson) auth(ALLOW_ROLE) external {
        // Change mapping to allow access
        accessAllowance[incomingPerson] = true;
        // Add new address to allowedAddresses array
        allowedAddressesIndex[incomingPerson] = allowedAddresses.length;
        allowedAddresses.push(incomingPerson);

        value += 1;
        // Emit event
        AccessAllowed(msg.sender, incomingPerson);
    }

    function revokeAccess(address incomingPerson) auth(REVOKE_ROLE) external {
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

        value -= 1;

        // Emit event
        AccessRevoked(msg.sender, incomingPerson);
    }

}
