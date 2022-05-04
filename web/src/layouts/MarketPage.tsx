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
      <hemisphereLight color="#1976D2" groundColor="#FFA500" position={[50, 10, 50]} intensity={1} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.2}>
          <ModelController>
            <Model
              tokenId={0}
              name="Curly"
              description=""
              path="./compressed.glb"
              position={[1, -11, -20]}
              rotation={[2, 0, -0]}
            />
            <Model
              tokenId={1}
              name="DNA"
              description="ab"
              path="./compressed.glb"
              position={[30, 0, -17]}
              rotation={[1, 1, -2]}
            />
            <Model
              tokenId={2}
              name="Headphones"
              description="ac"
              path="./compressed.glb"
              position={[40, 2, 4]}
              rotation={[1, 0, -1]}
            />
            <Model
              tokenId={3}
              name="VR_Headset"
              description="da"
              path="./compressed.glb"
              position={[25, -15, 28]}
              rotation={[1, 0, -1]}
              scale={5}
            />
            <Model
              tokenId={5}
              name="Notebook"
              description="ad"
              path="./compressed.glb"
              position={[-30, -20, -17]}
              rotation={[2, 0, 1]}
            />
            <Model
              tokenId={6}
              name="Rocket003"
              description="e"
              path="./compressed.glb"
              position={[35, 15, -5]}
              rotation={[1, 1, 0]}
            />
            <Model
              tokenId={7}
              name="Roundcube001"
              description="f"
              path="./compressed.glb"
              position={[-38, -5, 7]}
              rotation={[1, 0, 0]}
              scale={0.5}
            />
            <Model
              tokenId={8}
              name="Table"
              description="g"
              path="./compressed.glb"
              position={[1, 13, -26]}
              rotation={[1, 0, -1]}
              scale={0.5}
            />
            <Model
              tokenId={9}
              name="Zeppelin"
              description="ee"
              path="./compressed.glb"
              position={[-18, 16, 10]}
              rotation={[3, -1, 3]}
              scale={0.006}
            />
            <Model
              tokenId={10}
              name="node-0"
              description="asa"
              path="./Astronaut.glb"
              position={[10, 20, -20]}
              rotation={[0, 0, 0.2]}
              scale={10}
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
