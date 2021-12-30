"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_hardhat_config_1 = require("../helper-hardhat-config");
/*
--tags <tags>: only excute deploy scripts with the given tags (separated by commas) and their dependencies (see more info here about tags and dependencies)

--gasprice <gasprice>: specify the gasprice (in wei) to use by default for transactions executed via hardhat-deploy helpers in deploy scripts
*/
const deployMocks = async function (hre) {
    const { deployments, getNamedAccounts, getUnnamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    // const accounts = await hre.ethers.getSigners();
    // log(accounts[0].address); // ?: the same as deployer
    // log(accounts[1].address); // ?: the same as secondary (check the hardhat.config.ts file)
    //   ?: basically getNamedAccounts
    // log(await getUnnamedAccounts()); // ?: a fresh set of accounts. no permissions or whatever. Is different from namedaccounts or signers
    //   ?: only deploy mocks if on a hardhat or localhost
    if (helper_hardhat_config_1.developmentChains.includes(hre.network.name)) {
        log("Deploying mocks...");
        const linkToken = await deploy("LinkToken", {
            from: deployer,
            args: [],
            log: true,
        });
        await deploy("VRFCoordinatorMock", {
            from: deployer,
            log: true,
            args: [linkToken.address],
        });
        log("Mocks Deployed!");
    }
};
exports.default = deployMocks;
deployMocks.tags = ["all", "mocks", "oracle"];
