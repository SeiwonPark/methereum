import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// FIXME: or should it be inside "Navigator?"
export function Header() {
  return (
    <Text fontSize={10}>
      {/* TODO: mesh color props from global css variable */}
      <meshStandardMaterial side={THREE.DoubleSide} color="#1976D2" />
      Header
    </Text>
  );
}
