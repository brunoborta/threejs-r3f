import { useFrame } from "@react-three/fiber";
import { useBVH, meshBounds, OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandlers = (e) => {
    cube.current.material.color.set(
      `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${
        Math.random() * 100
      }%)`
    );
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-3} onClick={(event) => event.stopPropagation()}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.35}
        position-y={-1}
        onClick={(event) => {
          console.log(event.object.name);
          event.stopPropagation();
        }}
      />

      <mesh
        ref={cube}
        position-x={3}
        scale={1.5}
        onClick={eventHandlers}
        raycast={meshBounds}
        // useCursor
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
