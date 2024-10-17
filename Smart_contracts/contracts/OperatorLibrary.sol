 //SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DocumentLibrary.sol";

library OperatorLibrary {
    using DocumentLibrary for DocumentLibrary.Document[];

    struct Operator {
        string name;
        string organization;
        address userAddress;
        string position;
        DocumentLibrary.Document[] documents;
    }

    function addOperator(
        Operator[] storage operatorsArray,
        mapping(address => Operator) storage operatorsMapping,
        string memory _name,
        string memory _organization,
        address _userAddress,
        string memory _position
    ) external {
        operatorsMapping[_userAddress].name = _name;
        operatorsMapping[_userAddress].organization = _organization;
        operatorsMapping[_userAddress].userAddress =_userAddress;
        operatorsMapping[_userAddress].position = _position;

        operatorsArray.push(operatorsMapping[_userAddress]);
         
    }

    function getOperators(
        Operator[] storage operatorsArray,
        string memory organization
    ) external view returns (Operator[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < operatorsArray.length; i++) {
            if (
                keccak256(bytes(operatorsArray[i].organization)) ==
                keccak256(bytes(organization))
            ) {
                count++;
            }
        }

        Operator[] memory result = new Operator[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < operatorsArray.length; i++) {
            if (
                keccak256(bytes(operatorsArray[i].organization)) ==
                keccak256(bytes(organization))
            ) {
                result[index] = operatorsArray[i];
                index++;
            }
        }
        return result;
    }
}
