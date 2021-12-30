"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
// import { VRFCoordinatorMock } from "../typechain";
const chai_1 = require("chai");
describe("Oracle", async () => {
    let linkDeployment, VRFDeployment, oracleDeployment;
    const [deployer] = await hardhat_1.ethers.getSigners();
    let oracleContract;
    let VRFContract;
    let accounts;
    beforeEach(async () => {
        await hardhat_1.deployments.fixture(["all"]);
        oracleDeployment = await hardhat_1.deployments.get("Oracle");
        VRFDeployment = await hardhat_1.deployments.get("VRFCoordinatorMock");
        linkDeployment = await hardhat_1.deployments.get("LinkToken");
        oracleContract = await hardhat_1.ethers.getContractAt("Oracle", oracleDeployment.address, deployer);
        VRFContract = await hardhat_1.ethers.getContractAt("VRFCoordinatorMock", VRFDeployment.address, deployer);
    });
    it("VRF coordinator mock has correct address", async () => {
        const owner = await oracleContract.owner();
        console.log(owner);
        (0, chai_1.expect)(4).to.equal(5);
        // expect(owner).to.be.equal(deployer);
    });
});
