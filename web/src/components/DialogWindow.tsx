import React, { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
} from '@mui/material';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import CancelIcon from '@mui/icons-material/Cancel';
import { ethers } from 'ethers';
import { Wallet } from './Wallet';
import { useStore } from '../hooks/useStore';
import { ABIS } from '../contracts/abi';

export interface DialogWindowProps {
  handleClose: (e?: MouseEvent | undefined) => void
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());
const marketContract = new ethers.Contract(ABIS.MARKET_TX_ADDRESS[1].address, ABIS.MARKET, provider.getSigner());

export function DialogWindow({ handleClose }: DialogWindowProps) {
  const [owner, setOwner] = useState<string>('');
  const [price, setPrice] = useState<string>('0');
  const [highestBidder, setHighestBidder] = useState<string>('0');
  const [seller, setSeller] = useState<string>('0');
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

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }

    const getMarketInfo = async () => {
      if (modelId !== -1) {
        await marketContract.getInfo()
          .then(async (result: any) => {
            setPrice(ethers.utils.formatEther(result[1]));
            if (result[2] === ZERO_ADDRESS) {
              setHighestBidder('No one has bidded yet');
            } else {
              setHighestBidder(result[2]);
            }
            setSeller(result[5]);
          });
      }
    };

    const getNftInfo = async () => {
      if (modelId !== -1) {
        await nftContract.getInfo('0x3827C333746d83B0a59Da67F89710393c124E80c', modelId)
          .then(async (result: any) => {
            if (result[1] === ZERO_ADDRESS) {
              setOwner('No one has bidded yet');
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
            {'Seller: '}
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
            {'Owner: '}
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
            {'Price: '}
            {Number(price) * 1000000000000000000}
            {' '}
            Wei
            {' '}
            (
            {price}
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
            {'HighestBidder: '}
            {highestBidder}
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
