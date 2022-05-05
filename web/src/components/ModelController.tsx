import React, { useEffect, ReactNode } from 'react';
import { useBounds } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { ethers } from 'ethers';
import { useStore } from '../hooks/useStore';
import { DialogWindow } from './DialogWindow';
import { ABIS } from '../contracts/abi';

interface ModelControllerProps {
  children: ReactNode;
}

export function ModelController({ children }: ModelControllerProps) {
  const api = useBounds();
  const {
    clicked, model, modelId, changeModelId, changeClickState, changeModelDescription,
  } = useStore();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nftContract = new ethers.Contract(ABIS.NFT_TX_ADDRESS, ABIS.NFT, provider.getSigner());

  const handleOpen = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta <= 1) {
      api.refresh(e.object).fit();
      changeClickState();
    }
    changeModelId(model[Object(e.object.parent).parent.uuid].tokenId);
    changeModelDescription(model[Object(e.object.parent).parent.uuid].description);
  };

  const handleClose = (e?: MouseEvent) => {
    if (e === undefined || e!.button === 0) {
      api.refresh().fit();
    }
    if (clicked) {
      changeClickState();
    }
  };

  useEffect(() => {
    // ...
  }, [clicked, modelId]);

  return (
    <>
      <group
        onClick={(e) => handleOpen(e)}
        onPointerMissed={(e) => handleClose(e)}
      >
        {children}
      </group>
      <DialogWindow handleClose={handleClose} />
    </>
  );
}
