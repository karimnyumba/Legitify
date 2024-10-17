  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DocumentLibrary {
    struct Document {
        string cidValue;
        string ownerName;
        string identification;
        address sender;
        string description;
        string docName;
        string time;
        bool hasDocument;
    }

    struct Shares {
        address sender;
        address receiver;
        string time;
        string comment;
    }

    struct docShares {
        string identification;
        Shares[] share;
    }

    function addDocument(
        Document[] storage documentArray,
        mapping(string => Document) storage documentMapping,
        address sender,
        string memory cidValue,
        string memory time,
        string memory comment,
        string memory docName,
        string memory certificateOwner,
        string memory _identification
    ) external {
        Document memory newDocument = Document({
            cidValue: cidValue,
            sender: sender,
            time: time,
            description: comment,
            docName: docName,
            ownerName: certificateOwner,
            identification: _identification,
            hasDocument: false
        });
        documentArray.push(newDocument);
        documentMapping[_identification] = newDocument;
    }

    function updateDocumentFile(
        string memory _cid,
        Document[] storage documentArray,
        string memory _identification,
        mapping(string => Document) storage documentMapping
    ) external {
        documentMapping[_identification].cidValue = _cid;
        documentMapping[_identification].hasDocument = true;
          for (uint256 i = 0; i < documentArray.length; i++) {
            if (keccak256(bytes(documentArray[i].identification)) == keccak256(bytes(_identification))) {
             documentArray[i].cidValue = _cid;
                documentArray[i].hasDocument = true;
            }
        }

    }

    function verifyDocument(Document[] storage documentArray, string memory _cid) external view returns (bool) {
        for (uint256 i = 0; i < documentArray.length; i++) {
            if (keccak256(bytes(documentArray[i].cidValue)) == keccak256(bytes(_cid))) {
                return true;
            }
        }
        return false;
    }

    function returnDocument(
        string memory _identification,
        mapping(string => Document) storage documentMapping
    ) external view returns (Document memory) {
        return documentMapping[_identification];
    }

    function addShare(
        mapping(string => docShares) storage documentShares,
        address sender,
        address receiver,
        string memory _identification,
        string memory time,
        string memory comment
    ) external {
        documentShares[_identification].identification = _identification;
        documentShares[_identification].share.push(
            Shares(sender, receiver, time, comment)
        );
    }

    function getShares(mapping(string => docShares) storage documentShares, string memory _identification) external view returns (Shares[] memory) {
        return documentShares[_identification].share;
    }
}
