"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
// ?: call hh test to run tests
describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await hardhat_1.ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        const [owner, acc2] = await hardhat_1.ethers.getSigners();
        await greeter.deployed();
        (0, chai_1.expect)(await greeter.greet()).to.equal("Hello, world!");
        const setGreetingTx = await greeter
            .connect(owner)
            .setGreeting("Hola, mundo!");
        // wait until the transaction is mined
        await setGreetingTx.wait();
        (0, chai_1.expect)(await greeter.greet()).to.equal("Hola, mundo!");
    });
});
