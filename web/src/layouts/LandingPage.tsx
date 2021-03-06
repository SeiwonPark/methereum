import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Section } from '../components/Section';

export function LandingPage() {
  return (
    <Canvas>
      {/* {/* <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} /> */}
      <hemisphereLight color="white" groundColor="#ff0f00" position={[-10, 30, 10]} intensity={1} />
      <OrbitControls makeDefault enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      <Suspense fallback={null}>
        <Section />
      </Suspense>
    </Canvas>
  );
}
