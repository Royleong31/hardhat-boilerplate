/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types";
// eslint-disable-next-line node/no-missing-import
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { verify } from "../helpers";

// ?: need to manually verify after launch from command line
/*
As you can see the HRE passed in has 4 new fields :

getNamedAccounts is a function that returns a promise to an object whose keys are names and values are addresses. 
It is parsed from the namedAccounts configuration (see namedAccounts).

getUnnamedAccounts is a function that return a promise to an array of accounts which were not named (see namedAccounts). 
It is useful for tests where you want to be sure that the account has no speicifc role in the system (no token given, no admin access, etc...).

getChainId is a function which return a promise for the chainId, as convenience

deployments is an object which contains functions to access past deployments or to save new ones, as well as helpers functions.
*/

const deployMocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments,
    getNamedAccounts,
    getChainId,
    getUnnamedAccounts,
    network,
  } = hre;
  const { deploy, log, get } = deployments;

  const { deployer } = await getNamedAccounts();
  let linkTokenAddress: string, vrfCoordinatorAddress: string;
  const chainId = await getChainId();

  //   ?: If on a development chain
  if (developmentChains.includes(hre.network.name)) {
    // ?: hre.network.name returns the network name
    const linkToken = await get("LinkToken"); // ?: get gets a contract that has alr been deployed
    linkTokenAddress = linkToken.address;

    const vrfCoordinatorMock = await get("VRFCoordinatorMock");
    vrfCoordinatorAddress = vrfCoordinatorMock.address;
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken!;
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinator!;
  }

  log("Deploying verifiablerandomnessorg...");

  const verifiablerandomnessorg = await deploy("VerifiableRandomnessOrg", {
    from: deployer,
    args: [
      vrfCoordinatorAddress,
      linkTokenAddress,
      networkConfig[chainId].keyHash,
      networkConfig[chainId].fee,
    ],
    log: true,
  });

  //   ?: verify the contract if not on a dev chain
  if (!developmentChains.includes(hre.network.name)) {
    await verify(verifiablerandomnessorg.address, hre, [
      vrfCoordinatorAddress,
      linkTokenAddress,
      networkConfig[chainId].keyHash,
      networkConfig[chainId].fee,
    ]);
  }
  log(`Your contract has been deployed to ${verifiablerandomnessorg.address}`);
};

export default deployMocks;
deployMocks.tags = ["all"];
