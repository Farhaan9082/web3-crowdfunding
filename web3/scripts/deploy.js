const main = async () => {
  const CrowdFundingFactory = await hre.ethers.getContractFactory(
    "CrowdFunding"
  );
  const crowdFunding = await CrowdFundingFactory.deploy();
  await crowdFunding.deployed();

  console.log("Contract address: ", crowdFunding.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
