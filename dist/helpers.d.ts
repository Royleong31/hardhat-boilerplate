import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare function getHDWallet(): string[] | {
    mnemonic: string;
};
export declare const timer: (time: number) => Promise<void>;
export declare function verify(address: string, hre: HardhatRuntimeEnvironment, constructorArguments: any[]): Promise<boolean>;
export declare const saveAbi: (ticker: string, networkName: string) => void;
