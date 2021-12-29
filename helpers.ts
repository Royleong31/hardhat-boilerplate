import dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";

dotenv.config();

// ?: need to have either MNEMONIC or PRIVATE_KEY in the .env file
export function getHDWallet() {
  const { MNEMONIC, PRIVATE_KEY } = process.env;

  if (MNEMONIC && MNEMONIC !== "") return { mnemonic: MNEMONIC };
  if (PRIVATE_KEY && PRIVATE_KEY !== "") return [PRIVATE_KEY];

  throw Error("Private Key Not Set! Please set up .env");
}

export const timer = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

export async function verify(
  address: string,
  hre: HardhatRuntimeEnvironment,
  constructorArguments: any[]
) {
  await timer(20000); // ?: without the delay, the contract may not be ready on etherscan yet
  console.log("Started verification");
  await hre.run("verify:verify", {
    address,
    constructorArguments,
  });
  return true;
}

export const saveAbi = (ticker: string, networkName: string) => {
  const abiLocation = `./deployments/${networkName}/${ticker}.json`;
  const abi = fs.readFileSync(abiLocation, { encoding: "utf8" });

  fs.writeFileSync(`./frontend/abi/${ticker}.json`, abi);
};
