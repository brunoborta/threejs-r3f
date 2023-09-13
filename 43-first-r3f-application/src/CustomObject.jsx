import { useRef } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { DoubleSide } from "three";

export default function CustomObject() {
  const geometryRef = useRef();

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  const customItems = useMemo(() => {
    const verticesCount = 10 * 3;
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return { verticesCount, positions };
  }, []);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={customItems.verticesCount}
          itemSize={3}
          array={customItems.positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
}
