// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is VRFConsumerBase, Ownable {
    address payable recentWinner;

    bytes32 public immutable keyHash;
    uint256 public immutable fee;
    AggregatorV3Interface internal ethUsdPriceFeed;

    uint256 public randomResult;

    event RequestedRandomness(bytes32 requestId);
    event ReceivedRandomness(uint256 randomResult, bytes32 requestId);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee,
        address _ethUsdPriceFeed
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        keyHash = _keyHash;
        fee = _fee;
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeed);
    }

    function getEthPriceInUsd() public view returns (uint256 priceInUsd) {
        (
            uint80 roundId,
            int256 answer, // ?: the price
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = ethUsdPriceFeed.latestRoundData();

        uint256 decimals = ethUsdPriceFeed.decimals();
        priceInUsd = uint256(answer) / decimals;
    }

    function getRandomNumber() public onlyOwner {
        require(LINK.balanceOf(address(this)) > fee); // ?: LINK token interface was imported in VRFConsumerBase.sol
        bytes32 requestId = requestRandomness(keyHash, fee);
        emit RequestedRandomness(requestId);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomResult = randomness;
        emit ReceivedRandomness(randomResult, requestId);
    }
}
