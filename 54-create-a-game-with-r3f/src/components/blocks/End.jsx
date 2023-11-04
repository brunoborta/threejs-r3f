import { useGLTF } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

export default function End({ position = [0, 0, 0], geometry, material }) {
  const hamburger = useGLTF("/hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
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
        type="fixed"
        position={[0, 0.25, 0]}
        colliders="hull"
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
