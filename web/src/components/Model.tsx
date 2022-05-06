import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF as GLTFThree } from 'three/examples/jsm/loaders/GLTFLoader';
import { Euler } from '@react-three/fiber';
import { useStore } from '../hooks/useStore';

declare module 'three-stdlib' {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  }
}

interface ModelProps {
  tokenId: number;
  name: string;
  description: string;
  path: string;
  position: [x: number, y: number, z: number];
  rotation: Euler;
  scale?: number;
}

export function Model({
  name, path, description, tokenId, ...props
}: ModelProps) {
  const model = useGLTF(path);
  const { changeModelInfo } = useStore();

  useEffect(() => {
    const obj = {
      [model.scene.uuid]: {
        name,
        tokenId,
        description,
      },
    };
    changeModelInfo(obj);
  }, []);

  return (
    <group {...props}>
      <primitive object={model.scene} />
    </group>
  );
}

Model.defaultProps = {
  scale: 1,
};
