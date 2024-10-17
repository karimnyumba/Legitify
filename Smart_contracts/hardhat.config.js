/** @format */

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
// require("@nomiclabs/hardhat-waffle")
let PVTK = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: {
        mnemonic: process.env.MNEMONIC ?? "",
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${
        process.env.ALCHEMY_SEPOLIA_KEY ?? ""
      }`,
      accounts: {
        mnemonic: process.env.MNEMONIC ?? "",
      },
    },
  },
};
