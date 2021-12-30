"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_hardhat_config_1 = require("../helper-hardhat-config");
const hardhat_1 = require("hardhat");
const helpers_1 = require("../helpers");
const deployGreeter = async function (hre) {
    const { deployments, getChainId, getNamedAccounts, getUnnamedAccounts } = hre;
    const { deploy, log } = deployments;
    const chainId = await getChainId();
    // const { deployer } = await getNamedAccounts(); // ?: the accounts come from namedAccounts in hardhat.config.ts
    const [deployer, acc2] = await hre.ethers.getSigners();
    if (helper_hardhat_config_1.developmentChains.includes(hre.network.name)) {
        // do something like deploy mocks
    }
    const args = ["Hi!"];
    // ?: will get a deployment if it was alr deployed. Otherwise, it will deploy a new contract. A new contract will be deployed if the original contract was changed
    const greeter = await deploy("Greeter", {
        from: deployer.address,
        log: false,
        args,
    });
    log(`Greeter was deployed to ${greeter.address}`);
    const greeterFactory = await hardhat_1.ethers.getContractFactory("Greeter");
    const greeterContract = new hardhat_1.ethers.Contract(greeter.address, greeterFactory.interface, deployer);
    let greetingMessage = await greeterContract.greet();
    log(`Greeting Message: ${greetingMessage}`);
    const tx = await greeterContract.setGreeting("Where are you!");
    await tx.wait(1);
    // !: May need to add "await tx.wait(1)" if there are issues here
    greetingMessage = await greeterContract.greet();
    log(`Greeting Message: ${greetingMessage}`);
    if (!helper_hardhat_config_1.developmentChains.includes(hre.network.name)) {
        await (0, helpers_1.verify)(greeter.address, hre, args);
    }
    /* ALTERNATIVE: VERIFICATION THROUGH MANUAL COMMAND LINE.(easier to verify using verify() from helpers.ts)
    log(
      `Verify with:\n npx hardhat verify --network ${
        networkConfig[chainId].name
      } ${greeter.address} ${args.toString().replace(/,/g, " ")}`
    ); // ?: if there are multiple args, need to add them in for verification
    */
};
exports.default = deployGreeter;
deployGreeter.tags = ["all", "greeter"];
