/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkTokenInterface__factory>;
    getContractFactory(
      name: "VRFCoordinatorMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFCoordinatorMock__factory>;
    getContractFactory(
      name: "VRFConsumerBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFConsumerBase__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "LinkTokenInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkTokenInterface__factory>;
    getContractFactory(
      name: "VRFConsumerBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VRFConsumerBase__factory>;
    getContractFactory(
      name: "ERC677Token",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677Token__factory>;
    getContractFactory(
      name: "LinkToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkToken__factory>;
    getContractFactory(
      name: "ERC677",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677__factory>;
    getContractFactory(
      name: "ERC677Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677Receiver__factory>;
    getContractFactory(
      name: "LinkBasicToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkBasicToken__factory>;
    getContractFactory(
      name: "LinkERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkERC20__factory>;
    getContractFactory(
      name: "LinkERC20Basic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkERC20Basic__factory>;
    getContractFactory(
      name: "LinkStandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LinkStandardToken__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Greeter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Greeter__factory>;
    getContractFactory(
      name: "Oracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Oracle__factory>;

    getContractAt(
      name: "LinkTokenInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkTokenInterface>;
    getContractAt(
      name: "VRFCoordinatorMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFCoordinatorMock>;
    getContractAt(
      name: "VRFConsumerBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFConsumerBase>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "LinkTokenInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkTokenInterface>;
    getContractAt(
      name: "VRFConsumerBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VRFConsumerBase>;
    getContractAt(
      name: "ERC677Token",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677Token>;
    getContractAt(
      name: "LinkToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkToken>;
    getContractAt(
      name: "ERC677",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677>;
    getContractAt(
      name: "ERC677Receiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677Receiver>;
    getContractAt(
      name: "LinkBasicToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkBasicToken>;
    getContractAt(
      name: "LinkERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkERC20>;
    getContractAt(
      name: "LinkERC20Basic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkERC20Basic>;
    getContractAt(
      name: "LinkStandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LinkStandardToken>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Greeter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Greeter>;
    getContractAt(
      name: "Oracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Oracle>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}