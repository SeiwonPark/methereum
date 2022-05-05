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
  const { nodes, materials } = useGLTF(path);
  console.log(nodes, materials);
  const { changeModelInfo } = useStore();
  const sortedKeys = Object.keys(materials).sort();
  const materialName = sortedKeys.length === 1 ? Object.keys(materials)[0] : sortedKeys[tokenId];

  useEffect(() => {
    // const obj = {
    //   [materials[materialName].uuid]: {
    //     name,
    //     tokenId,
    //     description,
    //   },
    // };
    // changeModelInfo(obj);
  }, [nodes]);

  return (
    <group>
      <mesh
        geometry={nodes.Body_1.geometry}
        material={nodes.Body_1.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
      <mesh
        geometry={nodes.Body_2.geometry}
        material={nodes.Body_2.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
      <mesh
        geometry={nodes.Body_3.geometry}
        material={nodes.Body_3.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
      <mesh
        geometry={nodes.Body_4.geometry}
        material={nodes.Body_4.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
      <mesh
        geometry={nodes.Body_5.geometry}
        material={nodes.Body_5.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
      <mesh
        geometry={nodes.Body_6.geometry}
        material={nodes.Body_6.material}
        material-roughness={1}
        dispose={null}
        {...props}
      />
    </group>
  );
}

Model.defaultProps = {
  scale: 1,
};
