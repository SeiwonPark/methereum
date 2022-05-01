/**
 * This is a part of team project of 2022 KMU CS course, 'Practice in Network' by Prof. Sanghwan Lee.
 * This contract is for configuring NFT authorizing and authenticating by the contract owner.
 * Code referred to https://solidity-by-example.org/
 * Authored by Sooyeon Oh, Taewon Jung and Seiwon Park
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title NFT configuration
/// @notice Use this contract for NFT configuration
/// @dev Defined NFT configuration based on ERC-721 standard
contract NFT {
    /// @dev This emits when message sender is approved of NFT ID
    /// Indexed approved owner(message sender) will be logged along with NFT ID
    /// so that it makes it easier to filter each owner on etherscan.
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed nftId
    );

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /// @notice Returns the number of tokens `owner` has
    /// @dev Fetches owner from stored state variable, `_owners`
    /// @param owner Given approved address
    /// Throws unless given parameter `owner` is specified.
    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "No address specified: zero address");
        return _balances[owner];
    }

    /// @notice Gets the owner of NFT from its token ID
    /// @dev Fetches owner from stored state variable, `_owners`
    /// @param nftId NFT token ID
    /// Throws unless given parameter `owner` is specified or approved.
    function ownerOf(uint256 nftId) public view returns (address owner) {
        owner = _owners[nftId];
        require(owner != address(0), "Token doesn't exist");
    }

    function _transfer(
        address owner,
        address from,
        address to,
        uint256 nftId
    ) private {
        require(from == owner, "Not owner");
        require(to != address(0), "Transferred to the zero address");

        _approve(address(0), nftId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[nftId] = to;
    }

    function transfer(
        address from,
        address to,
        uint256 nftId
    ) external {
        address owner = ownerOf(nftId);
        _transfer(owner, from, to, nftId);
    }

    /// @notice Confirms NFT token ID
    /// @dev Handles storing approved NFT token ID to `_tokenApprovals`
    function _approve(address to, uint256 nftId) private {
        _tokenApprovals[nftId] = to;
    }

    /// @notice Confirms approved owner
    /// @dev Approves minted owner and athorize the message sender
    /// @param to Address to approve
    /// @param nftId NFT token ID
    /// Throws unless `msg.sender` is approved.
    function approve(address to, uint256 nftId) external {
        address owner = _owners[nftId];
        require(
            msg.sender == owner || _operatorApprovals[owner][msg.sender],
            "Not approved owner"
        );
        _approve(to, nftId);
    }

    /// @notice Minting address with its NFT token ID
    /// @dev Store address as minter
    /// @param to Address to mint
    /// @param nftId NFT token ID
    /// Throws unless given parameter `owner` is specified or already minted.
    function mint(address to, uint256 nftId) external {
        require(to != address(0), "Minted to zero address");
        require(_owners[nftId] == address(0), "Token already minted");

        _balances[to] += 1;
        _owners[nftId] = to;
    }
}
