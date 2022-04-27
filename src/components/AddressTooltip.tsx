import React, { useRef, useState } from 'react';
import {
  IconButton, Tooltip, TooltipProps, Typography, Zoom,
} from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { networkChainId } from '../utils/Connectors';

export function AddressTooltip() {
  const [title, setTitle] = useState('Copy to clipboard');
  const ref = useRef<TooltipProps>();
  const { account, chainId } = useWeb3React<Web3Provider>();

  const changeTitle = async () => {
    setTitle('Copied!');
    setTimeout(() => {
      setTitle('Copy to clipboard');
    }, 1000);
  };

  const copyWalletAddress = () => {
    try {
      navigator.clipboard.writeText(account as string);
      changeTitle();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        padding: '0.5rem',
      }}
    >
      <Typography variant="h6" component="h2">
        {networkChainId[chainId as number]}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Tooltip title={account as string} placement="top" TransitionComponent={Zoom}>
          <Typography variant="h6" component="h2">
            {account?.substring(0, 12)}
            ...
          </Typography>
        </Tooltip>
        <Tooltip ref={ref} title={title} placement="top" TransitionComponent={Zoom}>
          <IconButton onClick={copyWalletAddress} color="primary">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
