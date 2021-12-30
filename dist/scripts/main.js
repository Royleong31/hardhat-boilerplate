"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importStar(require("hardhat"));
const helper_hardhat_config_1 = require("../helper-hardhat-config");
// ?: to run this file, "hh run scripts/main.ts --network <networkName>"
async function main() {
    const { get } = hardhat_1.deployments;
    const [deployer, acc2] = await hardhat_1.ethers.getSigners();
    const oracleDeployment = await get("Oracle");
    const oracleContractFactory = await hardhat_1.ethers.getContractFactory("Oracle");
    const chainId = await (0, hardhat_1.getChainId)();
    let tx;
    const oracleContract = new hardhat_1.ethers.Contract(oracleDeployment.address, oracleContractFactory.interface, deployer);
    const ethUsdPrice = await oracleContract.getEthPriceInUsd();
    console.log(`Price of ETH/USD: ${ethUsdPrice}`);
    // const linkContractFactory = await ethers.getContractFactory("LinkToken");
    // const linkContract = new ethers.Contract(
    //   networkConfig[chainId].linkToken!,
    //   linkContractFactory.interface,
    //   deployer
    // );
    // let tx = await linkContract.transfer(
    //   oracleContract.address,
    //   networkConfig[chainId].fee
    // );
    // tx.wait(1);
    // ?: fundLink() below from 'hardhat' does the same thing as the code above
    await (0, hardhat_1.fundLink)(hardhat_1.default, oracleContract.address, helper_hardhat_config_1.networkConfig[chainId].fee, helper_hardhat_config_1.networkConfig[chainId].linkToken);
    await console.log("Successfully transferred");
    // eslint-disable-next-line prefer-const
    tx = await oracleContract.getRandomNumber();
    const receipt = await tx.wait();
    console.log(receipt.events[receipt.events.length - 1].args);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
