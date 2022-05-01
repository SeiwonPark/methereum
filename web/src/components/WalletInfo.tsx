/* eslint-disable max-len */
import React, { useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import { ethers } from 'ethers';
import {
  Alert, Avatar, Button, IconButton, Tooltip, TooltipProps, Typography, Zoom,
} from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { networkChainId } from '../utils/Connectors';
import { ABIS } from '../contracts/abi';

export function WalletInfo() {
  const [title, setTitle] = useState('Copy to clipboard');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const ref = useRef<TooltipProps>();
  const {
    active, account, chainId, library,
  } = useWeb3React<Web3Provider>();
  const [ethBalance, setEthBalance] = useState<string>('0.0');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nftContract = new ethers.Contract('0x91497CD8DdD479E8A91dB4F60f54308BA120429f', ABIS.NFT, provider.getSigner());
  const marketContract = new ethers.Contract('0x38142147969087ba96f505a404fac2e1d13d4ec9', ABIS.MARKET, provider.getSigner());

  const fetcher = (_library: any) => (...args: any) => {
    const [method, ...params] = args;
    return _library[method](...params);
  };

  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  });

  const changeTitle = async () => {
    // FIXME: it re-renders... any better ideas?
    setTitle('Copied!');
    setTimeout(() => {
      setTitle('Copy to clipboard');
    }, 1000);
  };

  // // FIXME: this is for the owner of NFT(admin)
  // const mint = async () => {
  //   try {
  //     await nftContract.mint(account, 1);
  //   } catch (err: any) {
  //     setErrorMessage(err.message);
  //     setTimeout(() => {
  //       setErrorMessage('');
  //     }, 3000);
  //   }
  // };

  const bid = async (amount: number) => {
    try {
      await marketContract.bid(amount);
    } catch (err: any) {
      setErrorMessage(err.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const copyWalletAddress = () => {
    try {
      navigator.clipboard.writeText(account as string);
      changeTitle();
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (active && balance !== undefined) {
      setEthBalance(ethers.utils.formatEther(balance));
    }

    library?.on('block', () => {
      console.log('update balance...');
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library?.removeAllListeners('block');
    };
  }, [library, balance, errorMessage]);

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
          height: 'max-content',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={() => bid(10)}
        >
          Bid
        </Button>
        {errorMessage !== '' && (<Alert severity="error">{errorMessage}</Alert>)}
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
          {parseFloat(ethBalance).toPrecision(8)}
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
