export const ABIS = {
  /** For contract owner */
  NFT_TX_ADDRESS: '0x0297e7c9bc3fd926bf71e76d38b8ac37409b04ee',
  /** For contract user */
  MARKET_TX_ADDRESS: {
    1: { address: '0xdc4261ca27edf4a8664f456f8d834e9afd4fa187' },
    2: { address: '0xf3873c7976d80b169dc70983b15eace45a9f0bb9' },
    3: { address: '0x32b0ed37539b665a7e269a9149d1c8b55028d993' },
    4: { address: '0xdc4261ca27edf4a8664f456f8d834e9afd4fa187' },
    5: { address: '0xdc4261ca27edf4a8664f456f8d834e9afd4fa187' },
    6: { address: '0xe6714e0e55a37cca5364e5c386b35208fccdb16e' },
  },
  NFT: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'approveContract',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'customTransferFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'getInfo',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: '_balance',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '_owner',
              type: 'address',
            },
          ],
          internalType: 'struct NFT.nftInfo',
          name: 'i',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nftId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  MARKET: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_nft',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_nftId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_startingBid',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Bid',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'winner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'End',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Withdraw',
      type: 'event',
    },
    {
      inputs: [],
      name: 'bid',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'bids',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'end',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'endAt',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ended',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getInfo',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: '_endAt',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '_highestBid',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '_highestBidder',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '_bids',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: '_started',
              type: 'bool',
            },
            {
              internalType: 'bool',
              name: '_ended',
              type: 'bool',
            },
            {
              internalType: 'address',
              name: '_seller',
              type: 'address',
            },
          ],
          internalType: 'struct Market.marketInfo',
          name: 'i',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'highestBid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'highestBidder',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nft',
      outputs: [
        {
          internalType: 'contract ERC721',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nftId',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'seller',
      outputs: [
        {
          internalType: 'address payable',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'start',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'started',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
