import React from 'react';
import * as THREE from 'three';
import {
  Html, Scroll, ScrollControls, useGLTF,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Particles } from './Particles';
import { Introduction } from './Introduction';
import { YoutubeViewer } from './YoutubeViewer';

export function Section() {
  const { height } = useThree((state) => state.viewport);
  const model = useGLTF('./milkcow1.glb');
  const url = new URL('https://www.youtube.com/watch?v=DZUP4tkgEfk&list=LL&index=12');

  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.7, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8, 0.01);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(4, Math.abs(mouse.x * mouse.y * 8)), 0.01);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.025, 0.001);
  });

  return (
    <ScrollControls pages={4}>
      <Scroll html>
        <Introduction />
      </Scroll>
      <Scroll>
        <Particles />
        <pointLight color="blue" position={[8, -25, 5]} intensity={20} />
        <pointLight
          color="red"
          position={[0, -height * 2.25, 5]}
          intensity={10}
        />
        <group
          position={[0, 1, 0]}
          rotation={[0, Math.PI, 0]}
          scale={0.3}
        >
          <primitive object={model.scene} />
        </group>
      </Scroll>
      <Scroll>
        <group
          position={[0, -21, 0]}
        >
          <Html>
            <YoutubeViewer url={url} />
          </Html>
        </group>
      </Scroll>
    </ScrollControls>
  );
}
