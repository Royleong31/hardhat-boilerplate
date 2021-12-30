/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
// eslint-disable-next-line node/no-missing-import
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { verify } from "../helpers";
import { ethers } from "ethers";

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

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getChainId, getNamedAccounts, getUnnamedAccounts } = hre;
  const { deploy, log, get } = deployments;
  const [deployer, acc2] = await hre.ethers.getSigners();
  let linkTokenAddress: string, vrfCoordinatorAddress: string;

  const chainId = await getChainId();

  if (developmentChains.includes(hre.network.name)) {
    // ?: if on dev chain, use the deployed mocks
    const linkToken = await get("LinkToken");
    linkTokenAddress = linkToken.address;

    const vrfCoordinator = await get("VRFCoordinatorMock");
    vrfCoordinatorAddress = vrfCoordinator.address;
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken!;
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinator!;
  }

  const oracleArgs = [
    vrfCoordinatorAddress,
    linkTokenAddress,
    networkConfig[chainId].keyHash,
    networkConfig[chainId].fee,
    networkConfig[chainId].ethUsdPriceFeed,
  ];

  const oracle = await deploy("Oracle", {
    from: deployer.address,
    args: oracleArgs,
  });

  const oracleContractFactory = await hre.ethers.getContractFactory("Oracle");
  const oracleContract = new ethers.Contract(
    oracle.address,
    oracleContractFactory.interface,
    deployer
  );

  log(`Contract successfully deployed to ${oracle.address}`);

  if (!developmentChains.includes(hre.network.name)) {
    const ethUsdPrice = await oracleContract.getEthPriceInUsd();
    log(`ETH/USD price is ${ethUsdPrice.toString()}`);

    const result = await verify(oracle.address, hre, oracleArgs);
    if (result) log("Verification successful!");

    log("Backup Verification");
    log(
      `Verify with:\n npx hardhat verify --network ${hre.network.name} ${
        oracleContract.address
      } ${oracleArgs.toString().replace(/,/g, " ")}`
    );
  }
};

export default deployMocks;
deployMocks.tags = ["all", "oracle"];
