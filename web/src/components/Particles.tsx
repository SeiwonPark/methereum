import React from 'react';
import { Point, Points } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { colorCodes } from '../utils/ColorCodes';

interface ParticlesProps {
  duplicates?: number;
}

export function Particles({ duplicates = 1000 }: ParticlesProps) {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <group>
      {Array.from({ length: duplicates }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Points limit={duplicates} key={i}>
          <pointsMaterial
            size={0.1}
            vertexColors
            color={colorCodes[Math.floor(Math.random() * (colorCodes.length - 1))]}
          />
          <mesh
            position={[
              (0.5 - Math.random()) * width * 2,
              0.5 * height + Math.random() ** 0.25 * height * -3,
              (0.5 - Math.random()) * 25,
            ]}
          >
            <Point />
          </mesh>
        </Points>
      ))}
    </group>
  );
}
