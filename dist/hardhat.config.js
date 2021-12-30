"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("./helpers");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("solidity-coverage");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("@appliedblockchain/chainlink-plugins-fund-link");
dotenv_1.default.config();
const config = {
    solidity: {
        compilers: [
            { version: "0.8.11" },
            { version: "0.4.24" },
            { version: "0.6.6" },
        ], // ?: can include multiple compiler versions
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
        // If you want to do some forking, uncomment this
        // forking: {
        //   url: MAINNET_RPC_URL
        // }
        },
        localhost: {
        // allowUnlimitedContractSize: true,
        },
        kovan: {
            url: process.env.KOVAN_RPC_URL,
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        rinkeby: {
            url: process.env.RINKEBY_RPC_URL,
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        ganache: {
            url: "http://localhost:8545",
            accounts: (0, helpers_1.getHDWallet)(),
        },
        mainnet: {
            url: process.env.MAINNET_RPC_URL,
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        polygon: {
            url: process.env.POLYGON_RPC_URL,
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        cronos_testnet: {
            url: "https://cronos-testnet-3.crypto.org:8545",
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        cronos: {
            url: "https://evm-cronos.crypto.org",
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        BSC: {
            url: "https://bsc-dataseed.binance.org/",
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
        fantom: {
            url: "https://rpc.ftm.tools/",
            accounts: (0, helpers_1.getHDWallet)(),
            saveDeployments: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // ?: default refers to the default network
        },
        secondary: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        gasPrice: 100,
        currency: "USD",
        outputFile: "gasReport.md",
        noColors: true,
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY, // ?: change to other network API key if not using ETH
    },
};
exports.default = config;
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();
//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });
