import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TitleProps {
  text: string;
  color?: string;
}

export function Title({ text, color }: TitleProps) {
  return (
    <Text fontSize={10}>
      <meshStandardMaterial side={THREE.DoubleSide} color={color} />
      {text}
    </Text>
  );
}
