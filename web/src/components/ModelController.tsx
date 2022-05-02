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
  const { clicked, model, changeClickState } = useStore();

  const foo = async () => {
    const response = await fetch('/');
    const data = await response;
  };

  const handleOpen = async (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta <= 1) {
      api.refresh(e.object).fit();
      changeClickState();
    }
    await foo();
    // TODO: model info
    // console.log(model[Object(e.object).material.uuid]);
  };

  const handleClose = (e?: MouseEvent) => {
    if (e === undefined || e!.button === 0) {
      api.refresh().fit();
    }
    if (clicked) {
      changeClickState();
    }
  };

  useEffect(() => {}, [clicked]);

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
