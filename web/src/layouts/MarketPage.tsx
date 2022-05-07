import React, { Suspense } from 'react';
import { Bounds, OrbitControls, ContactShadows } from '@react-three/drei';
import { ModelController } from '../components/ModelController';
import { Model } from '../components/Model';
import { Title } from '../components/Title';

export function MarketPage() {
  return (
    <>
      <Title text="Market" color="#1976D2" />
      {/* <spotLight position={[-100, -100, -100]} intensity={0.6} angle={0.3} penumbra={1} /> */}
      <hemisphereLight color="white" groundColor="#FFA500" position={[50, 10, 50]} intensity={1} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.2}>
          <ModelController>
            <Model
              tokenId={1}
              name="1st"
              description="asa"
              path="./milkcow1.glb"
              position={[-20, 10, 20]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
            <Model
              tokenId={2}
              name="2nd"
              description="asa2"
              path="./milkcow2.glb"
              position={[-20, -10, -20]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
            <Model
              tokenId={3}
              name="3rd"
              description="asa"
              path="./milkcow3.glb"
              position={[30, 15, -5]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
            <Model
              tokenId={4}
              name="4th"
              description="asa2"
              path="./milkcow4.glb"
              position={[-20, -10, -20]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
            <Model
              tokenId={5}
              name="5th"
              description="asa"
              path="./milkcow5.glb"
              position={[-10, 20, -30]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
            <Model
              tokenId={6}
              name="6th"
              description="asa2"
              path="./milkcow6.glb"
              position={[15, -15, -15]}
              rotation={[0, Math.PI, 0]}
              scale={2}
            />
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
