import React, { useRef, useEffect, ReactNode } from 'react';
import { useBounds } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useStore } from '../hooks/useStore';
import { DialogWindow } from './DialogWindow';

interface ModelControllerProps {
  children: ReactNode;
}

export function ModelController({ children }: ModelControllerProps) {
  const api = useBounds();
  const ref = useRef<any>();
  const { clicked, changeClickState } = useStore();

  const handleOpen = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta <= 1) {
      api.refresh(e.object).fit();
      changeClickState();
    }
  };

  const handleClose = (e?: MouseEvent) => {
    if (e === undefined) {
      api.refresh().fit();
    } else if (e!.button === 0) {
      api.refresh().fit();
    } else {
      // FIXME: ...
    }
    if (clicked) {
      changeClickState();
    }
  };

  useEffect(() => {}, [clicked]);

  return (
    <>
      <group
        ref={ref}
        onClick={(e) => handleOpen(e)}
        onPointerMissed={(e) => handleClose(e)}
      >
        {children}
      </group>
      <DialogWindow handleClose={handleClose} />
    </>
  );
}
