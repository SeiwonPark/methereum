import { InjectedConnector } from '@web3-react/injected-connector';

export const networkChainId: { [id: number]: string } = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan',
  137: 'Matic',
};

const supportChainIdList = Object.keys(networkChainId).map((id: string) => Number(id));

export const injected = new InjectedConnector({
  supportedChainIds: supportChainIdList,
});

export const connectorList = {
  MetaMask: injected,
};
