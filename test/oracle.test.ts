import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import hre, { network, deployments, ethers, run, fundLink } from "hardhat";

import { Deployment } from "hardhat-deploy/dist/types";
import { Oracle, VRFCoordinatorMock } from "../typechain";
import { expect } from "chai";
import { developmentChains, networkConfig } from "../helper-hardhat-config";

describe("Oracle", async () => {
  let linkDeployment: Deployment,
    VRFDeployment: Deployment,
    oracleDeployment: Deployment;

  let oracleContract: Oracle;
  let VRFContract: VRFCoordinatorMock;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    await deployments.fixture(["all"]);
    accounts = await ethers.getSigners();

    oracleDeployment = await deployments.get("Oracle");
    VRFDeployment = await deployments.get("VRFCoordinatorMock");
    linkDeployment = await deployments.get("LinkToken");

    oracleContract = await ethers.getContractAt(
      "Oracle",
      oracleDeployment.address,
      accounts[0]
    );

    VRFContract = await ethers.getContractAt(
      "VRFCoordinatorMock",
      VRFDeployment.address,
      accounts[0]
    );
  });

  it("has correct address", async () => {
    const owner = await oracleContract.owner();
    expect(owner).to.be.equal(accounts[0].address);
  });

  it("can emit event", async () => {
    const result = await oracleContract.add100(50);
    const receipt = await result.wait();

    // ?: cannot get return value directly from contract call, unless the function is view or pure. Use events to return value to caller
    const event = receipt.events!.find(({ event }) => event === "Number")!;
    const eventArgs = event.args!;
    expect(eventArgs.initialNum.toString()).to.be.equal("50");
    expect(eventArgs.finalNum.toString()).to.be.equal("150");
    expect(eventArgs.remarks.toString()).to.be.equal("Addition");

    // ?: alternative way to check for events using hardhat-waffle
    // ?: event chaining is not supported by vscode mocha test explorer extension, so use 'hh test'
    await expect(oracleContract.add100(30))
      .to.emit(oracleContract, "TestingEvent")
      .withArgs(30)
      .to.emit(oracleContract, "Number")
      .withArgs(30, 130, "Addition");
  });

  it("has the correct keyhash and fee", async () => {
    const keyhash = await oracleContract.keyHash();
    const fee = await oracleContract.fee();

    expect(keyhash).to.equal(networkConfig["31337"].keyHash);
    expect(fee).to.equal(networkConfig["31337"].fee);
  });
});
