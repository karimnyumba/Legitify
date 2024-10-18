/** @format */

import { create } from "ipfs-client";
import { ethers, Signer } from "ethers";
import { abi, contractAddress } from "../LegitifyConstants";

export let checker = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const response = await contract.operatorLogin(signer.getAddress());
  if (response != "") {
    return true;
  } else {
    return false;
  }
};

export let checkeradmin = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const response = await contract.operatorLogin(signer.getAddress());
  if (response == "admin") {
    return true;
  } else {
    return false;
  }
};

export let checkerer = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const response = await contract.testingAddress(signer.getAddress());
  if (response.orgName != "") {
    return true;
  } else {
    return false;
  }
};

export let checkerr = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const response = await contract.operatorFinder(signer.getAddress());
  if (response.name != "") {
    return true;
  } else {
    return false;
  }
};
