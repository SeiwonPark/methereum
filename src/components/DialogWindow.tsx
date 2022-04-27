import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@mui/material';
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { CloseButton } from './CloseButton';
import { Wallet } from './Wallet';
import { useStore } from '../hooks/useStore';

// FIXME: NEEDS TO BE FIXED
export interface DialogWindowProps {
  handleClose: (e?: MouseEvent | undefined) => void
}

export function DialogWindow({ handleClose }: DialogWindowProps) {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const { clicked } = useStore();

  const fitWindowSize = (): number => {
    const { innerWidth } = window;
    return innerWidth < 430 ? innerWidth * 0.6 : innerWidth * 0.3;
  };

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  };

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, []);

  return (
    <Html>
      <Dialog
        open={clicked}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogActions disableSpacing>
          <CloseButton handleClose={handleClose} />
        </DialogActions>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            paddingTop: 0,
            paddingBottom: '1rem',
            width: fitWindowSize(),
            wordWrap: 'break-word',
          }}
        >
          {'Title '.repeat(20)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{
              width: fitWindowSize(),
              wordWrap: 'break-word',
            }}
          >
            {'Content '.repeat(100)}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          disableSpacing
          sx={{
            justifyContent: 'flex-start',
          }}
        >
          <Web3ReactProvider getLibrary={(provider) => getLibrary(provider)}>
            <Wallet />
          </Web3ReactProvider>
        </DialogActions>
      </Dialog>
    </Html>
  );
}
