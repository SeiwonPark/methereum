import { ethers } from 'ethers';
import { ABIS } from '../contracts/abi';


interface ContractAddress {
  [key: number]: ethers.Contract;
}

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());

export const marketContract: ContractAddress = {
  1: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[1].address, ABIS.MARKET, provider.getSigner()),
  2: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[2].address, ABIS.MARKET, provider.getSigner()),
  3: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[3].address, ABIS.MARKET, provider.getSigner()),
  4: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[4].address, ABIS.MARKET, provider.getSigner()),
  5: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[5].address, ABIS.MARKET, provider.getSigner()),
  6: new ethers.Contract(ABIS.MARKET_TX_ADDRESS[6].address, ABIS.MARKET, provider.getSigner()),
};
