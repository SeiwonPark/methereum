import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
  Chip,
  Button,
} from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import CancelIcon from '@mui/icons-material/Cancel';
import { ethers } from 'ethers';
import { Wallet } from './Wallet';
import { useStore } from '../hooks/useStore';
import { nftContract, marketContract } from '../utils/ContractProvider';

export interface DialogWindowProps {
  handleClose: (e?: MouseEvent | undefined) => void
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function DialogWindow({ handleClose }: DialogWindowProps) {
  const [owner, setOwner] = useState<string>('');
  const [highestBid, setHighestBid] = useState<string>('0');
  const [highestBidder, setHighestBidder] = useState<string>('0');
  const [seller, setSeller] = useState<string>('0');
  const [state, setState] = useState<string>('');
  const [bids, setBids] = useState<number>(0);
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { clicked, modelId, modelDescription } = useStore();

  const fitWindowSize = (): number => {
    const { innerWidth } = window;
    return innerWidth < 430 ? innerWidth * 0.6 : innerWidth * 0.3;
  };

  const getLibrary = (_provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(_provider);
    library.pollingInterval = 8000;
    return library;
  };

  const withdraw = async () => {
    if (modelId !== -1) {
      await marketContract[modelId].withdraw();
    }
  };

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }

    const getMarketInfo = async () => {
      if (modelId !== -1) {
        await marketContract[modelId].getInfo()
          .then(async (result: any) => {
            setHighestBid(ethers.utils.formatEther(result[1]));
            if (result[2] === ZERO_ADDRESS) {
              setHighestBidder('No one has bidded yet');
            } else {
              setHighestBidder(result[2]);
            }
            if (result[4] === true) {
              setState('Auction is available');
            } else if (result[5] === true) {
              setState('Auction is ended');
            } else {
              setState('Need to start auction');
            }
            setBids(result[3]);
            setSeller(result[6]);
          });
      }
    };

    const getNftInfo = async () => {
      if (modelId !== -1) {
        await nftContract.getInfo('0x3827C333746d83B0a59Da67F89710393c124E80c', modelId)
          .then(async (result: any) => {
            if (result[1] === ZERO_ADDRESS) {
              setOwner('No owners yet');
            } else {
              setOwner(result[1]);
            }
            if (result !== undefined && result !== null && result !== '') { await getMarketInfo(); }
          });
      }
    };

    /** no more than an await */
    getNftInfo();
  }, [modelId]);

  return (
    <Html>
      <Dialog
        open={clicked}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogActions disableSpacing>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              cursor: 'pointer',
              color: 'var(--subPrimary)',
            }}
            onClick={() => handleClose()}
            color="primary"
          >
            <CancelIcon
              id="modal-button-close"
              fontSize="large"
              sx={{
                backgroundColor: 'white',
                borderRadius: '100%',
              }}
            />
          </IconButton>
        </DialogActions>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            paddingTop: 0,
            paddingBottom: '1rem',
            width: fitWindowSize(),
            wordWrap: 'break-word',
            fontWeight: 'bold',
            fontSize: '2rem',
          }}
        >
          #
          {modelId}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            {modelDescription}
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip label="Seller" />
            {' '}
            {seller}
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip label="Owner" />
            {' '}
            {owner}
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip label="Highest Bid" />
            {' '}
            {Number(highestBid) * 1000000000000000000}
            {' '}
            Wei
            {' '}
            (
            {highestBid}
            {' '}
            ETH)
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip label="Highest Bidder" />
            {' '}
            {highestBidder}
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip onClick={withdraw} label="Can withdraw" color={bids.toString() === '0' ? 'default' : 'secondary'} />
            {' '}
            {bids.toString()}
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
              margin: '0.5rem',
            }}
          >
            <Chip label={state} color={state === 'Auction is available' ? 'primary' : 'default'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          disableSpacing
          sx={{
            justifyContent: 'flex-start',
          }}
        >
          <Web3ReactProvider getLibrary={(_provider) => getLibrary(_provider)}>
            <Wallet />
          </Web3ReactProvider>
        </DialogActions>
      </Dialog>
    </Html>
  );
}
