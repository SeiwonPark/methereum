/* eslint-disable max-len */
import React, { useRef, useState, useEffect } from 'react';
import useSWR from 'swr';
import { ethers } from 'ethers';
import {
  Alert, Avatar, Button, IconButton, TextField, Tooltip, TooltipProps, Typography, Zoom,
} from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { networkChainId } from '../utils/Connectors';
import { ABIS } from '../contracts/abi';

export function WalletInfo() {
  const [title, setTitle] = useState('Copy to clipboard');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const ref = useRef<TooltipProps>();
  const [amount, setAmount] = useState(0);
  const {
    active, account, chainId, library,
  } = useWeb3React<Web3Provider>();
  const [ethBalance, setEthBalance] = useState<string>('0.0');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());
  const marketContract = new ethers.Contract(ABIS.MARKET_TX_ADDRESS, ABIS.MARKET, provider.getSigner());

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

  const bid = async () => {
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
      console.log('updated');
      mutate(undefined, true);
    });
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
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0.5rem',
        }}
      >
        <TextField
          autoFocus
          required
          id="outlined-number"
          label="Amount"
          type="number"
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            marginRight: '1rem',
          }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={bid}
        >
          Bid
        </Button>
      </div>
      {errorMessage !== '' && (<Alert severity="error">{errorMessage}</Alert>)}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '0.5rem',
        }}
      >
        <Typography variant="h6" component="h6">
          User Info
        </Typography>
        <IconButton
          sx={{
            width: 40,
            height: 40,
            cursor: 'pointer',
            color: 'var(--subPrimary)',
            transform: open ? 'scaleY(-1)' : 'scaleY(1)',
            transition: 'all 500ms ease',
          }}
          onClick={() => setOpen(!open)}
          color="primary"
        >
          <KeyboardArrowDownRoundedIcon
            id="dropdown-button"
            fontSize="large"
            sx={{
              backgroundColor: 'white',
              borderRadius: '100%',
            }}
          />
        </IconButton>
      </div>
      {open && (
        <div
          style={{
            padding: '0.5rem',
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
      )}
    </div>
  );
}
