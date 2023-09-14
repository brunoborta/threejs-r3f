import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef } from "react";
export default function Experience() {
  const cubeRef = useRef();
  const sphereRef = useRef();
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
      >
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={6}
            occlude={[sphereRef, cubeRef]}
          >
            That's a sphere!
          </Html>
        </mesh>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={cubeRef} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <MeshReflectorMaterial
          resolution={512}
          color="greenyellow"
          blur={[1000, 1000]}
          mixBlur={0.3}
          mirror={0.75}
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          position-y={2}
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          maxWidth={2}
          textAlign="center"
        >
          I Love R3F
        </Text>
      </Float>
    </>
  );
}
