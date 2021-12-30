import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { verify } from "../helpers";

const deployGreeter: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getChainId, getNamedAccounts, getUnnamedAccounts } = hre;
  const { deploy, log } = deployments;
  const chainId = await getChainId();
  // const { deployer } = await getNamedAccounts(); // ?: the accounts come from namedAccounts in hardhat.config.ts

  const [deployer, acc2] = await hre.ethers.getSigners();

  if (developmentChains.includes(hre.network.name)) {
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

  const greeterFactory = await ethers.getContractFactory("Greeter");
  const greeterContract = new ethers.Contract(
    greeter.address,
    greeterFactory.interface,
    deployer
  );

  let greetingMessage = await greeterContract.greet();
  log(`Greeting Message: ${greetingMessage}`);

  const tx = await greeterContract.setGreeting("Where are you!");
  await tx.wait(1);
  // !: May need to add "await tx.wait(1)" if there are issues here

  greetingMessage = await greeterContract.greet();
  log(`Greeting Message: ${greetingMessage}`);

  if (!developmentChains.includes(hre.network.name)) {
    await verify(greeter.address, hre, args);
  }

  /* ALTERNATIVE: VERIFICATION THROUGH MANUAL COMMAND LINE.(easier to verify using verify() from helpers.ts)
  log(
    `Verify with:\n npx hardhat verify --network ${
      networkConfig[chainId].name
    } ${greeter.address} ${args.toString().replace(/,/g, " ")}`
  ); // ?: if there are multiple args, need to add them in for verification
  */
};

export default deployGreeter;
deployGreeter.tags = ["all", "greeter"];
