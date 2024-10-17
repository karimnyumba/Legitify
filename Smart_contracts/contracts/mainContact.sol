 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DocumentLibrary.sol";
import "./OperatorLibrary.sol";

contract SecureDocument {
    using DocumentLibrary for DocumentLibrary.Document[];
    using DocumentLibrary for mapping(string => DocumentLibrary.docShares);
    using OperatorLibrary for OperatorLibrary.Operator[];
    using OperatorLibrary for mapping(address => OperatorLibrary.Operator);

    /* STATE VARIABLES */
    address public i_owner;
    event ReturnContractId(address from_sender, address contractId);
    event returnLoginStatus(bool status, address opadd);

    struct Organizations {
        string orgName;
        address orgAddress;
        string[] members;
        string location;
    }

    Organizations[] organizationArray;

    mapping(address => Organizations) public organizationAvailable;

    struct Users {
        address userAddres;
        string userType;
    }
    Users[] userArray;

    OperatorLibrary.Operator[] public operatorsArray;
    DocumentLibrary.Document[] public documentArray;

    mapping(address => OperatorLibrary.Operator) public operators;
    mapping(string => DocumentLibrary.docShares) public documentShares;
    mapping(string => DocumentLibrary.Document) public documentMapping;
    mapping(address => Users) public usersMapping;

    constructor() {
        i_owner = msg.sender;
        usersMapping[i_owner].userType = "admin";
    }

    modifier ownerOnly() {
        require(msg.sender == i_owner, "Admin Account is required");
        _;
    }

    modifier RegisteredUser() {
        for (uint256 i = 0; i < operatorsArray.length; i += 1) {
            if (msg.sender == operatorsArray[i].userAddress) {
                _;
            }
        }
    }

    modifier isIstitutionAdmin() {
        bool isAdmin = false;
        for (uint256 i = 0; i < organizationArray.length; i += 1) {
            if (msg.sender == organizationArray[i].orgAddress) {
                isAdmin = true;
            }
        }
        require(isAdmin, "Institution Admin account is required");
        _;
    }

    function addOrganization(
        string memory name,
        address orgAdd,
        string memory location
    ) public ownerOnly {
        Organizations memory newOrg = Organizations({
            orgName: name,
            orgAddress: orgAdd,
            members: new string[](0),
            location: location
        });
        organizationArray.push(newOrg);

        Users memory newUser = Users({
            userAddres: orgAdd,
            userType: "institution"
        });

        userArray.push(newUser);
        usersMapping[orgAdd].userType = "institution";
    }

    function isAvailable(address orgadd) public view returns (bool) {
        bool result = false;
        for (uint256 i; i < organizationArray.length; i++) {
            if (organizationArray[i].orgAddress == orgadd) {
                result = true;
                break;
            }
        }
        return result;
    }

    function testingAddress(address orgadd)
        public
        view
        returns (Organizations memory)
    {
        Organizations memory foundOrg;
        for (uint256 i; i < organizationArray.length; i++) {
            if (organizationArray[i].orgAddress == orgadd) {
                foundOrg = organizationArray[i];
            }
        }
        return foundOrg;
    }

    function getOrganization() public view returns (Organizations[] memory) {
        return organizationArray;
    }

    function addOperator(
        string memory _name,
        string memory _organization,
        address _userAddress,
        string memory _position
    ) public isIstitutionAdmin {
        operatorsArray.addOperator(operators, _name, _organization, _userAddress, _position);

        Users memory newUser = Users({
            userAddres: _userAddress,
            userType: "operator"
        });
        userArray.push(newUser);
        usersMapping[_userAddress].userType = "operator";
    }

    function getOperators(string memory org)
        public
        view
        returns (OperatorLibrary.Operator memory)
    {
        return operatorsArray.getOperator(org);
    }

    function operatorLogin(address add) public view returns (string memory) {
        return usersMapping[add].userType;
    }

    function operatorFinder(address add)
        public
        view
        returns (OperatorLibrary.Operator memory)
    {
        OperatorLibrary.Operator memory val;
        for (uint256 i = 0; i < operatorsArray.length; i += 1) {
            if (add == operatorsArray[i].userAddress) {
                val = operatorsArray[i];
            }
        }
        return val;
    }

    function getAllOperators() public view returns (OperatorLibrary.Operator[] memory) {
        return operatorsArray;
    }

    function sendDocument(
        address _receiver,
        string memory _cidValue,
        string memory _time,
        string memory comment
    ) public returns (bool) {
        DocumentLibrary.Document memory sharedDocument = documentMapping[_cidValue];
        DocumentLibrary.Document[] memory usersDocuments = operators[_receiver].documents;
        bool found = false;

        for (uint256 index = 0; index < usersDocuments.length; index++) {
            if (keccak256(bytes(_cidValue)) == keccak256(bytes(usersDocuments[index].cidValue))) {
                found = true;
                break;
            }
        }

        if (!found) {
            operators[_receiver].documents.push(sharedDocument);
        }
        documentShares.addShare(msg.sender, _receiver, _cidValue, _time, comment);

        return true;
    }

    function storeDocument(
        string memory _cidValue,
        string memory _time,
        string memory comment,
        string memory _docName
    ) public returns (bool) {
        documentArray.addDocument(documentMapping, msg.sender, _cidValue, _time, comment, _docName);
        operators[msg.sender].documents.push(documentMapping[_cidValue]);
        return true;
    }

    function verifyDocument(string memory _cid) public view returns (bool) {
        return documentArray.verifyDocument(_cid);
    }

    function getDocuments(address userAddress)
        public
        view
        returns (DocumentLibrary.Document[] memory)
    {
        return operators[userAddress].documents;
    }

    function presenceChecker(string memory hashedDoc) public view returns (bool) {
        return documentArray.verifyDocument(hashedDoc);
    }

    function getShares(string memory _cidValue)
        public
        view
        returns (DocumentLibrary.Shares[] memory)
    {
        return documentShares.getShares(_cidValue);
    }
}
