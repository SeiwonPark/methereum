import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF as GLTFThree } from 'three/examples/jsm/loaders/GLTFLoader';
import { Euler } from '@react-three/fiber';

declare module 'three-stdlib' {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
  }
}

interface ModelProps {
  name: string;
  position: [x: number, y: number, z: number];
  rotation: Euler;
  scale?: number;
}

export function Model({ name, ...props }: ModelProps) {
  const { nodes } = useGLTF('./compressed.glb');

  return (
    <mesh
      geometry={nodes[name].geometry}
      material={nodes[name].material}
      material-emissive="red"
      material-roughness={1}
      dispose={null}
      {...props}
    />
  );
}

Model.defaultProps = {
  scale: 1,
};
