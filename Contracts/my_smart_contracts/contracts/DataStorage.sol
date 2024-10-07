// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Data {
        string name;
        string email;
        address owner;
    }

    mapping(uint256 => Data) private dataStore;
    uint256 private dataCount;

    function setData(string calldata name, string calldata email) external {
        dataCount++;
        dataStore[dataCount] = Data(name, email, msg.sender);
    }

    function getData(uint256 id) external view returns (string memory, string memory, address) {
        require(id > 0 && id <= dataCount, "Data does not exist.");
        Data memory data = dataStore[id];
        return (data.name, data.email, data.owner);
    }

    function getDataCount() external view returns (uint256) {
        return dataCount;
    }
}
