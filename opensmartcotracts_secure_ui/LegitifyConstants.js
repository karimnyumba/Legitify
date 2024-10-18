//import { create } from "ipfs-client";

// import { create } from "ipfs-http-client";

// export const ipfsClient = create({
//   host: "https://ipfs.infura.io:5001/api/v0",
//   headers: {
//     Authorization:
//       "Basic " +
//       btoa(
//         "2G1bHUGzqF6NbfMrG21ohOzFD3E" + ":" + "6ae2d11381cd9eec8f395593b9d3f053"
//       ),
//   },
// });

import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = "2G1bHUGzqF6NbfMrG21ohOzFD3E";
const projectSecret = "6ae2d11381cd9eec8f395593b9d3f053";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

export const ipfsGateway = "https://secure-doc.infura-ipfs.io/ipfs/";

export const contractAddress = "0xb3c5212b268f801B02819883937D6bBB450B6bb4"; // "0xD7eb76758BB22BB80FD7FE4DDf6280818BaABF9c ";

export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from_sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractId",
        type: "address",
      },
    ],
    name: "ReturnContractId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "opadd",
        type: "address",
      },
    ],
    name: "returnLoginStatus",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_organization",
        type: "string",
      },
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_position",
        type: "string",
      },
    ],
    name: "addOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "orgAdd",
        type: "address",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
    ],
    name: "addOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "documentArray",
    outputs: [
      {
        internalType: "string",
        name: "cidValue",
        type: "string",
      },
      {
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "identification",
        type: "string",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "docName",
        type: "string",
      },
      {
        internalType: "string",
        name: "time",
        type: "string",
      },
      {
        internalType: "bool",
        name: "hasDocument",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "documentMapping",
    outputs: [
      {
        internalType: "string",
        name: "cidValue",
        type: "string",
      },
      {
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "identification",
        type: "string",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "docName",
        type: "string",
      },
      {
        internalType: "string",
        name: "time",
        type: "string",
      },
      {
        internalType: "bool",
        name: "hasDocument",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "documentShares",
    outputs: [
      {
        internalType: "string",
        name: "identification",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOperators",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "organization",
            type: "string",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cidValue",
                type: "string",
              },
              {
                internalType: "string",
                name: "ownerName",
                type: "string",
              },
              {
                internalType: "string",
                name: "identification",
                type: "string",
              },
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "docName",
                type: "string",
              },
              {
                internalType: "string",
                name: "time",
                type: "string",
              },
              {
                internalType: "bool",
                name: "hasDocument",
                type: "bool",
              },
            ],
            internalType: "struct DocumentLibrary.Document[]",
            name: "documents",
            type: "tuple[]",
          },
        ],
        internalType: "struct OperatorLibrary.Operator[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "getDocuments",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "cidValue",
            type: "string",
          },
          {
            internalType: "string",
            name: "ownerName",
            type: "string",
          },
          {
            internalType: "string",
            name: "identification",
            type: "string",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "docName",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
          {
            internalType: "bool",
            name: "hasDocument",
            type: "bool",
          },
        ],
        internalType: "struct DocumentLibrary.Document[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "org",
        type: "string",
      },
    ],
    name: "getOperators",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "organization",
            type: "string",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cidValue",
                type: "string",
              },
              {
                internalType: "string",
                name: "ownerName",
                type: "string",
              },
              {
                internalType: "string",
                name: "identification",
                type: "string",
              },
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "docName",
                type: "string",
              },
              {
                internalType: "string",
                name: "time",
                type: "string",
              },
              {
                internalType: "bool",
                name: "hasDocument",
                type: "bool",
              },
            ],
            internalType: "struct DocumentLibrary.Document[]",
            name: "documents",
            type: "tuple[]",
          },
        ],
        internalType: "struct OperatorLibrary.Operator[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOrganization",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "orgName",
            type: "string",
          },
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string[]",
            name: "members",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
        ],
        internalType: "struct SecureDocument.Organizations[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_cidValue",
        type: "string",
      },
    ],
    name: "getShares",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct DocumentLibrary.Shares[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "orgadd",
        type: "address",
      },
    ],
    name: "isAvailable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "add",
        type: "address",
      },
    ],
    name: "operatorFinder",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "organization",
            type: "string",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "cidValue",
                type: "string",
              },
              {
                internalType: "string",
                name: "ownerName",
                type: "string",
              },
              {
                internalType: "string",
                name: "identification",
                type: "string",
              },
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "docName",
                type: "string",
              },
              {
                internalType: "string",
                name: "time",
                type: "string",
              },
              {
                internalType: "bool",
                name: "hasDocument",
                type: "bool",
              },
            ],
            internalType: "struct DocumentLibrary.Document[]",
            name: "documents",
            type: "tuple[]",
          },
        ],
        internalType: "struct OperatorLibrary.Operator",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "add",
        type: "address",
      },
    ],
    name: "operatorLogin",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userAddres",
            type: "address",
          },
          {
            internalType: "string",
            name: "userType",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "orgName",
            type: "string",
          },
        ],
        internalType: "struct SecureDocument.Users",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "operators",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "position",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "operatorsArray",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "position",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "organizationAvailable",
    outputs: [
      {
        internalType: "string",
        name: "orgName",
        type: "string",
      },
      {
        internalType: "address",
        name: "orgAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "hashedDoc",
        type: "string",
      },
    ],
    name: "presenceChecker",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_identification",
        type: "string",
      },
    ],
    name: "returnDocument",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "cidValue",
            type: "string",
          },
          {
            internalType: "string",
            name: "ownerName",
            type: "string",
          },
          {
            internalType: "string",
            name: "identification",
            type: "string",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "docName",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
          {
            internalType: "bool",
            name: "hasDocument",
            type: "bool",
          },
        ],
        internalType: "struct DocumentLibrary.Document",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "_time",
        type: "string",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
      {
        internalType: "string",
        name: "_identification",
        type: "string",
      },
    ],
    name: "sendDocument",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_cidValue",
        type: "string",
      },
      {
        internalType: "string",
        name: "_time",
        type: "string",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
      {
        internalType: "string",
        name: "_docName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "identification",
        type: "string",
      },
    ],
    name: "storeDocument",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "orgadd",
        type: "address",
      },
    ],
    name: "testingAddress",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "orgName",
            type: "string",
          },
          {
            internalType: "address",
            name: "orgAddress",
            type: "address",
          },
          {
            internalType: "string[]",
            name: "members",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
        ],
        internalType: "struct SecureDocument.Organizations",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_cid",
        type: "string",
      },
      {
        internalType: "string",
        name: "_identification",
        type: "string",
      },
    ],
    name: "updateDocumentFile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usersMapping",
    outputs: [
      {
        internalType: "address",
        name: "userAddres",
        type: "address",
      },
      {
        internalType: "string",
        name: "userType",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "orgName",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_cid",
        type: "string",
      },
    ],
    name: "verifyDocument",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
