export interface networkConfigItem {
    name: string;
    ethUsdPriceFeed?: string;
    keyHash?: string;
    fee?: string;
    linkToken?: string;
    vrfCoordinator?: string;
}
export interface networkConfigInfo {
    [key: string]: networkConfigItem;
}
export declare const networkConfig: networkConfigInfo;
export declare const developmentChains: string[];
export declare const getNetworkIdFromName: (networkIdName: string) => Promise<string | null>;
