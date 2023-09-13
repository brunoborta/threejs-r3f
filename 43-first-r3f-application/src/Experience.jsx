import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useFrame, useThree } from "@react-three/fiber";

import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  const { camera, gl } = useThree();
  useFrame((state, delta) => {
    // state.camera.position.x = Math.sin(state.clock.elapsedTime) * 4;
    // state.camera.position.z = Math.cos(state.clock.elapsedTime) * 4;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight intensity={1.5} position={[1, 2, 3]} />
      <ambientLight intensity={0.5} />

      <group>
        <mesh position-x={2} ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh rotation-x={-1.5} position-x={2} position={[2, -0.5, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>
      <group>
        <mesh position-x={-2} position-y={0.5} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh rotation-x={-1.5} position-x={-2} position={[-2, -0.5, 0]}>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </group>

      <CustomObject />
    </>
  );
}
