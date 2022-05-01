/**
 * This is a part of team project of 2022 KMU CS course, 'Practice in Network' by Prof. Sanghwan Lee.
 * This contract is for configuring NFT auction market and handling its trading process.
 * Code referred to https://solidity-by-example.org/
 * Authored by Sooyeon Oh, Taewon Jung and Seiwon Park
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title ERC-721 standard interface
/// @notice Uses ERC-721 based token
/// @dev Well defined at https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
interface ERC721 {
    function transfer(
        address from,
        address to,
        uint256 nftId
    ) external;
}

/// @title NFT market contract
/// @notice Use this contract for NFT trading
/// @dev Defined NFT market settings and controllers
contract Market {
    /// @dev This emits when message sender bids on an asset
    /// Indexed sender will be logged so that it makes it easier to filter
    /// each sender on etherscan.
    event Bid(address indexed sender, uint256 amount);

    /// @dev This emits when message sender withdraws from the bidded contract
    /// Indexed bidder will be logged so that it makes it easier to filter
    /// each sender on etherscan.
    event Withdraw(address indexed bidder, uint256 amount);

    /// @dev This emits when contract owner ends auction or when the time is up
    /// Bid winner and bidding amount will be logged.
    event End(address winner, uint256 amount);

    ERC721 public nft;
    uint256 public nftId;
    address payable public seller;
    uint256 public endAt;
    bool public started;
    bool public ended;
    address public highestBidder;
    uint256 public highestBid;
    mapping(address => uint256) public bids;

    /// @notice Configures Market contract with NFT contract
    /// @dev Initializing Market contract with deployed NFT contract
    /// @param _nft Deployed NFT address
    /// @param _nftId Deployed NFT token ID
    /// @param _startingBid Deployed NFT's start bidding amount
    constructor(
        address _nft,
        uint256 _nftId,
        uint256 _startingBid
    ) {
        nft = ERC721(_nft);
        nftId = _nftId;

        seller = payable(msg.sender);
        highestBid = _startingBid;
    }

    /// @notice Checks if the market is started
    /// @dev Sets modifiers to give constraints depending on the parameter `_started`
    /// @param _started State variable `started`
    /// Throws unless parameter, `_started` is true
    modifier onStart(bool _started) {
        require(
            _started,
            !_started
                ? "Auction has already been started."
                : "Auction is not started yet."
        );
        _;
    }

    /// @notice Starts selling asset on NFT market tagged with its token ID
    /// @dev Initializing auction market depending on the state variable, `started`
    /// Throws unless `msg.sender` is the current contract owner
    function start() external onStart(!started) {
        require(msg.sender == seller, "not seller");

        nft.transfer(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 3600 * 1 seconds;
    }

    /// @notice Bids on the current NFT asset
    /// @dev Updates highest bidding info with `amount`
    /// @param amount amount to bid
    /// Throws if `block.timestamp` already passed `endAt`
    /// and bidding amount is lower than `highestBid`
    function bid(uint256 amount) external payable onStart(started) {
        require(block.timestamp < endAt, "ended");
        require(amount > highestBid, "value < highest");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = amount;

        emit Bid(msg.sender, amount);
    }

    /// @notice Takes back message sender's bidded amount
    /// @dev Resets stored bidded amount and makes transfer to take it back
    function withdraw() external {
        uint256 biddedAmount = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(biddedAmount);

        emit Withdraw(msg.sender, biddedAmount);
    }

    /// @notice Ends bidding and sets bid winner
    /// @dev Updates NFT info with the bid winner
    /// Throws unless current time passes the time, `endAt` and checks if it's ended
    function end() external onStart(started) {
        // require(block.timestamp >= endAt, "not ended"); FIXME:
        require(!ended, "ended");

        ended = true;
        if (highestBidder != address(0)) {
            nft.transfer(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.transfer(address(this), seller, nftId);
        }

        emit End(highestBidder, highestBid);
    }
}
