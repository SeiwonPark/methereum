import React, { Suspense } from 'react';
import { Bounds, OrbitControls, ContactShadows } from '@react-three/drei';
import { ModelController } from '../components/ModelController';
import { Model } from '../components/Model';
import { Title } from '../components/Title';

export function MarketPage() {
  return (
    <>
      <Title text="Market" color="#1976D2" />
      <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
      <hemisphereLight color="white" groundColor="#ff0f00" position={[-10, 30, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.2}>
          <ModelController>
            <Model name="Curly" position={[1, -11, -20]} rotation={[2, 0, -0]} />
            <Model name="DNA" position={[30, 0, -17]} rotation={[1, 1, -2]} />
            <Model name="Headphones" position={[35, 2, 4]} rotation={[1, 0, -1]} />
            <Model name="Notebook" position={[-30, -20, -17]} rotation={[2, 0, 1]} />
            <Model name="Rocket003" position={[25, 15, -5]} rotation={[1, 1, 0]} />
            <Model name="Roundcube001" position={[-38, -5, 7]} rotation={[1, 0, 0]} scale={0.5} />
            <Model name="Table" position={[1, 13, -26]} rotation={[1, 0, -1]} scale={0.5} />
            <Model name="VR_Headset" position={[25, -15, 28]} rotation={[1, 0, -1]} scale={5} />
            <Model name="Zeppelin" position={[-18, 16, 10]} rotation={[3, -1, 3]} scale={0.006} />
          </ModelController>
        </Bounds>
        {/* FIXME: no fixed width & height */}
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -50, 0]}
          opacity={1}
          width={300}
          height={300}
          blur={1}
          far={50}
        />
      </Suspense>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
    </>
  );
}
