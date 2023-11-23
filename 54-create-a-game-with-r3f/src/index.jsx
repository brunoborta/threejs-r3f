import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./components/Interface";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <KeyboardControls
    // KeyW and w are different keys. If you are not using a qwerty keyboard,
    //you can use the key prop to specify the key position.
    map={[
      { name: "forward", keys: ["KeyW", "ArrowUp"] },
      { name: "backward", keys: ["KeyS", "ArrowDown"] },
      { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
      { name: "rightward", keys: ["KeyD", "ArrowRight"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
