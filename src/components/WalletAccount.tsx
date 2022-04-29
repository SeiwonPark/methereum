import React, { useRef, useState, useEffect } from 'react';
import {
  Avatar, IconButton, Tooltip, TooltipProps, Typography, Zoom,
} from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuery } from 'react-query';
import { networkChainId } from '../utils/Connectors';

export function WalletAccount() {
  const [title, setTitle] = useState('Copy to clipboard');
  const ref = useRef<TooltipProps>();
  const { account, chainId, library } = useWeb3React<Web3Provider>();

  // const { data: balance } = useQuery(['getBalance', account, 'latest']);

  const changeTitle = async () => {
    // FIXME: it re-renders... any better ideas?
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
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        <img
          alt="network-name"
          src="/ethereum-logo.png"
          style={{
            height: 30,
            marginLeft: '0.4rem',
            marginRight: '1.2rem',
          }}
        />
        <Typography variant="h6" component="h2">
          {networkChainId[chainId as number]}
          (Current Network)
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            marginRight: '1rem',
            bgcolor: account !== undefined ? `#${account?.substring(2, 8)}` : '#bdbdbd',
          }}
        />
        <Tooltip title={account as string} placement="top" TransitionComponent={Zoom}>
          <Typography variant="h6" component="h2">
            {account?.substring(0, 16)}
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
