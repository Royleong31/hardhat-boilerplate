"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAbi = exports.verify = exports.timer = exports.getHDWallet = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// ?: need to have either MNEMONIC or PRIVATE_KEY in the .env file
function getHDWallet() {
    const { MNEMONIC, PRIVATE_KEY } = process.env;
    if (MNEMONIC && MNEMONIC !== "")
        return { mnemonic: MNEMONIC };
    if (PRIVATE_KEY && PRIVATE_KEY !== "")
        return [PRIVATE_KEY];
    throw Error("Private Key Not Set! Please set up .env");
}
exports.getHDWallet = getHDWallet;
const timer = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
exports.timer = timer;
// ?: verify the contract with the ETHERSCAN API key. (change the key for non-ETH chains)
async function verify(address, hre, constructorArguments) {
    await (0, exports.timer)(20000); // ?: without the delay, the contract may not be ready on etherscan yet
    console.log("Started verification");
    await hre.run("verify:verify", {
        address,
        constructorArguments,
    });
    return true;
}
exports.verify = verify;
// ?: use this to store the ABI in frontend folder
const saveAbi = (ticker, networkName) => {
    const abiLocation = `./deployments/${networkName}/${ticker}.json`;
    const abi = fs_1.default.readFileSync(abiLocation, { encoding: "utf8" });
    fs_1.default.writeFileSync(`./frontend/abi/${ticker}.json`, abi);
};
exports.saveAbi = saveAbi;
