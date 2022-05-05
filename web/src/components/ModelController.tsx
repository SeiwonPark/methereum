import React, { ReactNode } from 'react';
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
    clicked, model, changeModelId, changeClickState, changeModelDescription,
  } = useStore();

  const handleOpen = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    if (e.delta <= 1) {
      api.refresh(e.object).fit();
      changeClickState();
    }

    const id = model[Object(e.object.parent).parent.uuid].tokenId;
    changeModelId(id);
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

  return (
    <>
      <group
        onClick={(e) => { handleOpen(e); }}
        onPointerMissed={(e) => handleClose(e)}
      >
        {children}
      </group>
      <DialogWindow handleClose={handleClose} />
    </>
  );
}
