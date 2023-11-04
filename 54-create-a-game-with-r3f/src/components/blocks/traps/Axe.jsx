import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState, useRef } from "react";

export default function Axe({
  position = [0, 0, 0],
  geometry,
  material,
  obstacleMaterial,
}) {
  const obstacle = useRef();

  // Random speed
  // Multiply by -1 to reverse the direction
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!obstacle.current) return;
    const time = state.clock.getElapsedTime();

    // Adding the position to have the actual position of the obstacle
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + Math.sin(time * timeOffset) * 1.25,
      y: position[1] + 0.75,
      z: position[2],
    });
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
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}
