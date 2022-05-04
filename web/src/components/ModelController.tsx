import React, { useEffect, ReactNode } from 'react';
import { useBounds } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useStore } from '../hooks/useStore';
import { DialogWindow } from './DialogWindow';

interface ModelControllerProps {
  children: ReactNode;
}

export function ModelController({ children }: ModelControllerProps) {
  const api = useBounds();
  const {
    clicked, model, modelId, changeModelId, changeClickState, changeModelDescription,
  } = useStore();

  const handleOpen = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta <= 1) {
      api.refresh(e.object).fit();
      changeClickState();
    }
    changeModelId(model[Object(e.object).material.uuid].tokenId);
    changeModelDescription(model[Object(e.object).material.uuid].description);
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
