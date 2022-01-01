/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  VerifiableRandomnessOrg,
  VerifiableRandomnessOrgInterface,
} from "../VerifiableRandomnessOrg";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "vrfCoordinator",
        type: "address",
      },
      {
        internalType: "address",
        name: "linkToken",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "keyHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomness",
        type: "uint256",
      },
    ],
    name: "RandomnessFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "range",
        type: "uint256",
      },
    ],
    name: "RequestedRandomness",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "range",
        type: "uint256",
      },
    ],
    name: "getRandomNumber",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "randomness",
        type: "uint256",
      },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "s_requestIdToRNG",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "s_requestIdToRange",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162000dbf38038062000dbf83398181016040528101906200003791906200019b565b83838173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505050508160018190555080600281905550505050506200020d565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000ed82620000c0565b9050919050565b620000ff81620000e0565b81146200010b57600080fd5b50565b6000815190506200011f81620000f4565b92915050565b6000819050919050565b6200013a8162000125565b81146200014657600080fd5b50565b6000815190506200015a816200012f565b92915050565b6000819050919050565b620001758162000160565b81146200018157600080fd5b50565b60008151905062000195816200016a565b92915050565b60008060008060808587031215620001b857620001b7620000bb565b5b6000620001c8878288016200010e565b9450506020620001db878288016200010e565b9350506040620001ee8782880162000149565b9250506060620002018782880162000184565b91505092959194509250565b60805160a051610b7e620002416000396000818161012f01526103c00152600081816101d001526103840152610b7e6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806335a2149f146100515780634ade984f1461008157806394985ddd146100b1578063b37217a4146100cd575b600080fd5b61006b6004803603810190610066919061057a565b6100fd565b60405161007891906105c0565b60405180910390f35b61009b6004803603810190610096919061057a565b610115565b6040516100a891906105c0565b60405180910390f35b6100cb60048036038101906100c69190610607565b61012d565b005b6100e760048036038101906100e29190610647565b6101c9565b6040516100f49190610683565b60405180910390f35b60046020528060005260406000206000915090505481565b60036020528060005260406000206000915090505481565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b2906106fb565b60405180910390fd5b6101c5828261030e565b5050565b60006002547f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610227919061075c565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610268919061078c565b10156102a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a09061082b565b60405180910390fd5b6102b7600154600254610380565b9050816003600083815260200190815260200160002081905550807f593e15623f532f149247fc36c3b5cc4483916d3bbdf67d5168f742ab66b5faf88360405161030191906105c0565b60405180910390a2919050565b60036000838152602001908152602001600020548161032d919061087a565b6004600084815260200190815260200160002081905550817f9b0aa3f92f46e24caa76b000bdf0dd495b9b390c320cf6585ae10a12b7d09edb8260405161037491906105c0565b60405180910390a25050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16634000aea07f0000000000000000000000000000000000000000000000000000000000000000848660006040516020016103f49291906108ab565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016104219392919061096d565b6020604051808303816000875af1158015610440573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046491906109e3565b50600061048684600030600080898152602001908152602001600020546104d0565b90506001600080868152602001908152602001600020546104a79190610a3f565b600080868152602001908152602001600020819055506104c7848261050c565b91505092915050565b6000848484846040516020016104e99493929190610a95565b6040516020818303038152906040528051906020012060001c9050949350505050565b60008282604051602001610521929190610b1c565b60405160208183030381529060405280519060200120905092915050565b600080fd5b6000819050919050565b61055781610544565b811461056257600080fd5b50565b6000813590506105748161054e565b92915050565b6000602082840312156105905761058f61053f565b5b600061059e84828501610565565b91505092915050565b6000819050919050565b6105ba816105a7565b82525050565b60006020820190506105d560008301846105b1565b92915050565b6105e4816105a7565b81146105ef57600080fd5b50565b600081359050610601816105db565b92915050565b6000806040838503121561061e5761061d61053f565b5b600061062c85828601610565565b925050602061063d858286016105f2565b9150509250929050565b60006020828403121561065d5761065c61053f565b5b600061066b848285016105f2565b91505092915050565b61067d81610544565b82525050565b60006020820190506106986000830184610674565b92915050565b600082825260208201905092915050565b7f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00600082015250565b60006106e5601f8361069e565b91506106f0826106af565b602082019050919050565b60006020820190508181036000830152610714816106d8565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107468261071b565b9050919050565b6107568161073b565b82525050565b6000602082019050610771600083018461074d565b92915050565b600081519050610786816105db565b92915050565b6000602082840312156107a2576107a161053f565b5b60006107b084828501610777565b91505092915050565b7f4e6f7420656e6f756768204c494e4b202d2066696c6c20636f6e74726163742060008201527f7769746820666175636574000000000000000000000000000000000000000000602082015250565b6000610815602b8361069e565b9150610820826107b9565b604082019050919050565b6000602082019050818103600083015261084481610808565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610885826105a7565b9150610890836105a7565b9250826108a05761089f61084b565b5b828206905092915050565b60006040820190506108c06000830185610674565b6108cd60208301846105b1565b9392505050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561090e5780820151818401526020810190506108f3565b8381111561091d576000848401525b50505050565b6000601f19601f8301169050919050565b600061093f826108d4565b61094981856108df565b93506109598185602086016108f0565b61096281610923565b840191505092915050565b6000606082019050610982600083018661074d565b61098f60208301856105b1565b81810360408301526109a18184610934565b9050949350505050565b60008115159050919050565b6109c0816109ab565b81146109cb57600080fd5b50565b6000815190506109dd816109b7565b92915050565b6000602082840312156109f9576109f861053f565b5b6000610a07848285016109ce565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a4a826105a7565b9150610a55836105a7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610a8a57610a89610a10565b5b828201905092915050565b6000608082019050610aaa6000830187610674565b610ab760208301866105b1565b610ac4604083018561074d565b610ad160608301846105b1565b95945050505050565b6000819050919050565b610af5610af082610544565b610ada565b82525050565b6000819050919050565b610b16610b11826105a7565b610afb565b82525050565b6000610b288285610ae4565b602082019150610b388284610b05565b602082019150819050939250505056fea26469706673582212208436c9d6bb442014e624513aa4ca6f4e62f7f3ff68d903fad33487a54b393dfa64736f6c634300080b0033";

export class VerifiableRandomnessOrg__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    vrfCoordinator: string,
    linkToken: string,
    keyHash: BytesLike,
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VerifiableRandomnessOrg> {
    return super.deploy(
      vrfCoordinator,
      linkToken,
      keyHash,
      fee,
      overrides || {}
    ) as Promise<VerifiableRandomnessOrg>;
  }
  getDeployTransaction(
    vrfCoordinator: string,
    linkToken: string,
    keyHash: BytesLike,
    fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      vrfCoordinator,
      linkToken,
      keyHash,
      fee,
      overrides || {}
    );
  }
  attach(address: string): VerifiableRandomnessOrg {
    return super.attach(address) as VerifiableRandomnessOrg;
  }
  connect(signer: Signer): VerifiableRandomnessOrg__factory {
    return super.connect(signer) as VerifiableRandomnessOrg__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifiableRandomnessOrgInterface {
    return new utils.Interface(_abi) as VerifiableRandomnessOrgInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VerifiableRandomnessOrg {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as VerifiableRandomnessOrg;
  }
}