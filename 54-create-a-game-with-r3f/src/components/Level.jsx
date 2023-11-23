import BlockStart from "./blocks/Start";
import BlockSpinner from "./blocks/traps/Spinner";
import BlockLimbo from "./blocks/traps/Limbo";
import BlockAxe from "./blocks/traps/Axe";
import BlockEnd from "./blocks/End";
import * as THREE from "three";
import { useMemo } from "react";
import Bounds from "./Bounds";

// Creating geometry and material outside of the component improves performance
// The actual size of the geometry will be defined with the scale property
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floorGreenMaterial = new THREE.MeshStandardMaterial({
  color: "limegreen",
});
const floorYellowMaterial = new THREE.MeshStandardMaterial({
  color: "greenyellow",
});
const obstaclesMaterial = new THREE.MeshStandardMaterial({
  color: "orangered",
});
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const Block = types[Math.floor(Math.random() * types.length)];
      blocks.push(Block);
    }
    return blocks;
  }, [count, types, seed]);
  return (
    <>
      <BlockStart geometry={boxGeometry} material={floorGreenMaterial} />
      {blocks.map((Block, index) => {
        return (
          <Block
            geometry={boxGeometry}
            material={floorYellowMaterial}
            obstacleMaterial={obstaclesMaterial}
            key={index}
            position={[0, 0, -(index + 1) * 4]}
          />
        );
      })}
      <BlockEnd
        geometry={boxGeometry}
        material={floorGreenMaterial}
        position={[0, 0, -(count + 1) * 4]}
      />
      {/* +2 because of the start and end blocks */}
      <Bounds
        length={count + 2}
        geometry={boxGeometry}
        material={wallMaterial}
      />
    </>
  );
}

{
  /* <>
      <BlockStart
        geometry={boxGeometry}
        material={floorGreenMaterial}

      />
      <BlockSpinner
        geometry={boxGeometry}
        material={floorYellowMaterial}
        obstacleMaterial={obstaclesMaterial}
        position={[0, 0, 12]}
      />
      <BlockLimbo
        geometry={boxGeometry}
        material={floorYellowMaterial}
        obstacleMaterial={obstaclesMaterial}
        position={[0, 0, 8]}
      />
      <BlockAxe
        geometry={boxGeometry}
        material={floorYellowMaterial}
        obstacleMaterial={obstaclesMaterial}
        position={[0, 0, 4]}
      />
      <BlockEnd geometry={boxGeometry} material={floorGreenMaterial} />
    </> */
}
