import { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import { useControls } from "leva";

export default function Fox() {
  const model = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(model.animations, model.scene);

  const { animationName } = useControls({
    animationName: {
      options: [...animations.names],
    },
  });

  console.log(animations);
  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };

    // window.setTimeout(() => {
    //   animations.actions.Walk.play();
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 2000);
  }, [animationName]);

  return (
    <primitive
      object={model.scene}
      scale={0.02}
      position={[-2.5, -1, 2.5]}
      rotation-y={0.3}
    />
  );
}
