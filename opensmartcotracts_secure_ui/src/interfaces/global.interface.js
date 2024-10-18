import { ethers } from "ethers";
import { abi, contractAddress } from "../../LegitifyConstants";

export const FieldTypes = Object.freeze({
  TEXT: "text",
  TEXTAREA: "textarea",
  SELECT: "select",
  NUMBER: "number",
  EMAIL: "email",
  URL: "url",
  PASSWORD: "password",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  CUSTOM: "custom-field",
  COLOR: "color",
});

export const FieldErrors = Object.freeze({
  REQUIRED: "*This field is required",
});

export const getSignerContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return {
    contract: new ethers.Contract(contractAddress, abi, signer),
    signer,
  };
};

export const getFormatedTimeStampStartWithDate = () => {
  return `${new Date()}`;
};

export const getBinaryFromBase64 = async (base64) => {
  return atob(base64.split(";base64,")[1]);
};

export const encodeText = (plainText) => {
  return btoa(plainText);
};

export const decodeText = (encodedText) => {
  return atob(encodedText);
};
