/**
 * This is a part of team project of 2022 KMU CS course, 'Practice in Network' by Prof. Sanghwan Lee.
 * This contract is for configuring NFT authorizing and authenticating by the contract owner.
 * Code referred to https://solidity-by-example.org/
 * Authored by Sooyeon Oh, Taewon Chung and Seiwon Park
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title NFT configuration
/// @notice Use this contract for NFT configuration
/// @dev Defined NFT configuration based on ERC-721 standard
contract NFT {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /// @notice Set struct of NFT info
    /// @dev Set struct in order to fetch data in one function call
    struct nftInfo {
        uint256 _balance;
        address _owner;
    }

    /// @notice Returns the number of tokens `owner` has
    /// @dev Fetches owner from stored state variable, `_owners`
    /// @param owner Given approved address
    /// Throws unless given parameter `owner` is specified.
    function balanceOf(address owner) external view returns (uint256) {
        require(owner != address(0), "Owner is not specified: zero address.");
        return _balances[owner];
    }

    /// @notice Gets the owner of NFT from its token ID
    /// @dev Fetches owner from stored state variable, `_owners`
    /// @param nftId NFT token ID
    /// Throws unless given parameter `owner` is specified or approved.
    function ownerOf(uint256 nftId) public view returns (address owner) {
        owner = _owners[nftId];
        require(owner != address(0), "Token doesn't exist.");
    }

    /// @notice Gets the owner of NFT and the owner's balance
    /// @dev This function returns in a tuple (balance, owner)
    /// @param owner Given approved address
    /// @param nftId NFT token ID
    /// Throws unless given parameter `owner` is specified or approved.
    function getInfo(address owner, uint256 nftId)
        external
        view
        returns (nftInfo memory i)
    {
        i._owner = _owners[nftId];
        require(
            owner != address(0),
            "Owner is not specified or token doesn't exist."
        );
        i._balance = _balances[owner];
        return i;
    }

    function setApprovalForAll(address operator, bool approved) external {
        _operatorApprovals[msg.sender][operator] = approved;
    }

    function getApproved(uint256 nftId) external view returns (address) {
        require(_owners[nftId] != address(0), "Token doesn't exist.");
        return _tokenApprovals[nftId];
    }

    /// @notice Confirms NFT token ID
    /// @dev Handles storing approved NFT token ID to `_tokenApprovals`
    function _approveContract(address to, uint256 nftId) private {
        _tokenApprovals[nftId] = to;
    }

    /// @notice Confirms approved owner
    /// @dev Approves minted owner and athorize the message sender
    /// @param to Address to approve
    /// @param nftId NFT token ID
    /// Throws unless `msg.sender` is approved.
    function approveContract(address to, uint256 nftId)
        external
        returns (bool)
    {
        address owner = _owners[nftId];
        require(
            msg.sender == owner || _operatorApprovals[owner][msg.sender],
            "Not owner nor approved."
        );
        _approveContract(to, nftId);
        return true;
    }

    function _isApprovedOrOwner(
        address owner,
        address spender,
        uint256 nftId
    ) private view returns (bool) {
        return (owner == spender ||
            _tokenApprovals[nftId] == spender ||
            _operatorApprovals[owner][spender]);
    }

    function _customTransfer(
        address owner,
        address from,
        address to,
        uint256 nftId
    ) private {
        require(from == owner, "Not owner.");
        require(to != address(0), "Tried transfer to the zero address.");

        _approveContract(address(0), nftId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[nftId] = to;
    }

    function customTransferFrom(
        address from,
        address to,
        uint256 nftId
    ) external {
        address owner = ownerOf(nftId);
        require(
            _isApprovedOrOwner(owner, msg.sender, nftId),
            "Not owner nor approved."
        );
        _customTransfer(owner, from, to, nftId);
    }

    /// @notice Minting address with its NFT token ID
    /// @dev Store address as minter
    /// @param to Address to mint
    /// @param nftId NFT token ID
    /// Throws unless given parameter `owner` is specified or already minted.
    function mint(address to, uint256 nftId) external {
        require(to != address(0), "Minted to zero address.");
        require(_owners[nftId] == address(0), "Token already minted.");

        _balances[to] += 1;
        _owners[nftId] = to;
    }
}
