"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_hardhat_config_1 = require("../helper-hardhat-config");
const helpers_1 = require("../helpers");
const ethers_1 = require("ethers");
/*
As you can see the HRE passed in has 4 new fields :

getNamedAccounts is a function that returns a promise to an object whose keys are names and values are addresses.
It is parsed from the namedAccounts configuration (see namedAccounts).

getUnnamedAccounts is a function that return a promise to an array of accounts which were not named (see namedAccounts).
It is useful for tests where you want to be sure that the account has no specific role in the system (no token given, no admin access, etc...).

getChainId is a function which return a promise for the chainId, as convenience

deployments is an object which contains functions to access past deployments or to save new ones, as well as helpers functions.

to call selected files in /deploy, use hh deploy --tags <tagName> --network <networkName>

Contract will only be deployed once if there are no changes to the code. Delete the contract file in /deployments to re-deploy
*/
const deployMocks = async function (hre) {
    const { deployments, getChainId, getNamedAccounts, getUnnamedAccounts } = hre;
    const { deploy, log, get } = deployments;
    const [deployer, acc2] = await hre.ethers.getSigners();
    let linkTokenAddress, vrfCoordinatorAddress;
    const chainId = await getChainId();
    if (helper_hardhat_config_1.developmentChains.includes(hre.network.name)) {
        // ?: if on dev chain, use the deployed mocks
        const linkToken = await get("LinkToken");
        linkTokenAddress = linkToken.address;
        const vrfCoordinator = await get("VRFCoordinatorMock");
        vrfCoordinatorAddress = vrfCoordinator.address;
    }
    else {
        linkTokenAddress = helper_hardhat_config_1.networkConfig[chainId].linkToken;
        vrfCoordinatorAddress = helper_hardhat_config_1.networkConfig[chainId].vrfCoordinator;
    }
    const oracleArgs = [
        vrfCoordinatorAddress,
        linkTokenAddress,
        helper_hardhat_config_1.networkConfig[chainId].keyHash,
        helper_hardhat_config_1.networkConfig[chainId].fee,
        helper_hardhat_config_1.networkConfig[chainId].ethUsdPriceFeed,
    ];
    const oracle = await deploy("Oracle", {
        from: deployer.address,
        args: oracleArgs,
    });
    const oracleContractFactory = await hre.ethers.getContractFactory("Oracle");
    const oracleContract = new ethers_1.ethers.Contract(oracle.address, oracleContractFactory.interface, deployer);
    log(`Contract successfully deployed to ${oracle.address}`);
    if (!helper_hardhat_config_1.developmentChains.includes(hre.network.name)) {
        const ethUsdPrice = await oracleContract.getEthPriceInUsd();
        log(`ETH/USD price is ${ethUsdPrice.toString()}`);
        const result = await (0, helpers_1.verify)(oracle.address, hre, oracleArgs);
        if (result)
            log("Verification successful!");
    }
};
exports.default = deployMocks;
deployMocks.tags = ["all", "oracle"];
