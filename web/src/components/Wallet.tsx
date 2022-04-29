import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Button, Avatar } from '@mui/material';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { connectorList } from '../utils/Connectors';
import { WalletAccount } from './WalletAccount';

export function Wallet() {
  const { active, activate, deactivate } = useWeb3React<Web3Provider>();
  const eagerConnect = useEagerConnect();

  const handleClick = (connectorName: 'MetaMask') => {
    try {
      activate(connectorList[connectorName]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisconnect = () => {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [active]);

  return (
    <div
      className="connect-wallet"
      style={{
        padding: '1rem',
      }}
    >
      {active && (
        <div>
          <WalletAccount />
          <Button
            size="large"
            variant="contained"
            onClick={handleDisconnect}
            endIcon={
              <Avatar alt="metamask-logo" src="../../metamask-logo.png" />
            }
          >
            Disconnect from MetaMask
          </Button>
        </div>
      )}
      {!active && (
        <Button
          size="large"
          variant="contained"
          onClick={() => handleClick('MetaMask')}
          endIcon={
            <Avatar alt="metamask-logo" src="../../metamask-logo.png" />
          }
        >
          Connect to MetaMask
        </Button>
      )}
    </div>
  );
}
