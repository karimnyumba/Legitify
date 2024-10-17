const { ethers, getNamedAccounts } = require("hardhat");

async function makeVote() {
  const { deployer } = await getNamedAccounts();

  // console.log(deployer);
  const voteContract = await ethers.getContractAt(
    "CollegeVoting",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    deployer
  );

  console.log("voting ..........");
  const voteTx = await voteContract.makevote(0);
  const voteTxReceipt = await voteTx.wait(1);
  const totalVotes = voteTxReceipt.events[0].args.totalVotes;
  const candId = voteTxReceipt.events[0].args.candidateAddress;

  console.log(`${candId} + ${totalVotes}`);
}

try {
  makeVote();
} catch (error) {
  //console.log(error);
}
