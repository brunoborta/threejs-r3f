import { useEffect, useRef, useState } from "react";
import {
  Text3D,
  OrbitControls,
  Center,
  useMatcapTexture,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useFrame } from "@react-three/fiber";

// Using three as a solution to create only one geometry and material
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // 100% react solution - kinda weird
  // const [torus, setTorus] = useState();
  // const [material, setMaterial] = useState();

  const donutGroup = useRef();
  // const donuts = useRef([]);
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useFrame((_, delta) => {
    // Group solution - simpler
    donutGroup.current.children.forEach((donut) => {
      donut.rotation.y += delta * 0.25;
    });

    // Adding an array of refs to the donuts ref - more complex
    // donuts.current.forEach((donut) => {
    //   donut.rotation.y += delta * 0.25;
    // });
  });

  useEffect(() => {
    // Necessary to get the correct colors of the material
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* React only solution */}
      {/* <torusGeometry ref={setTorus} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          Hello R3F
        </Text3D>
      </Center>
      <group ref={donutGroup}>
        {Array.from({ length: 100 }).map((_, i) => (
          <mesh
            // ref={(ref) => (donuts.current[i] = ref)}
            key={i}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.25 + Math.random() * 0.25}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}
