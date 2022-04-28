import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function LandingPage() {
  const navigator = useNavigate();

  const useNavigator = (path: string) => {
    navigator(path);
  };

  return (
    <Canvas>
      <Header />
      <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
      <hemisphereLight color="white" groundColor="#ff0f00" position={[-10, 30, 10]} intensity={1} />
      <Html>
        <Button
          variant="contained"
          onClick={() => useNavigator('market')}
        >
          Go to Market
        </Button>
      </Html>
      <OrbitControls makeDefault enableZoom={false} minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
}
