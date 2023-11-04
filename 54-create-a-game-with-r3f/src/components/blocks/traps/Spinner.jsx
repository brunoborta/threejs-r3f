import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState, useRef } from "react";

export default function Spinner({
  position = [0, 0, 0],
  geometry,
  material,
  obstacleMaterial,
}) {
  const obstacle = useRef();

  // Random speed
  // Multiply by -1 to reverse the direction
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    if (!obstacle.current) return;
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * speed, 0);
    const quaternionRotation = new THREE.Quaternion().setFromEuler(
      eulerRotation
    );
    obstacle.current.setNextKinematicRotation(quaternionRotation);
  });
  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacle}
      >
        <mesh
          geometry={geometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
