describe("addOrganisation", async () => {
  it("provide the ability for the admin to add the org", async () => {
    beforeEach(async function() {
      const secureDocument = await ethers.getContractFactory("secureDocument");
      contract = await secureDocument.deploy();
      await contract.deployed();

      [owner] = await ethers.getSigners();
    });
  });
});
