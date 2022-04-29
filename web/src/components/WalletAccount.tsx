import React, { useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import { ethers } from 'ethers';
import {
  Avatar, IconButton, Tooltip, TooltipProps, Typography, Zoom,
} from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { networkChainId } from '../utils/Connectors';

export function WalletAccount() {
  const [title, setTitle] = useState('Copy to clipboard');
  const ref = useRef<TooltipProps>();
  const {
    active, account, chainId, library,
  } = useWeb3React<Web3Provider>();
  const [ethBalance, setEthBalance] = useState<string>('0.0');

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

  const fetcher = (_library: any) => (...args: any) => {
    const [method, ...params] = args;
    return _library[method](...params);
  };

  const { data: balance } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  });

  useEffect(() => {
    if (active && balance !== undefined) {
      setEthBalance(ethers.utils.formatEther(balance));
    }
  }, [active, balance]);

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
          {ethBalance}
          {' '}
          ETH
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
