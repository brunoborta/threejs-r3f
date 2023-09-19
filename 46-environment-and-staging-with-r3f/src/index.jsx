import * as THREE from "three";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import Experience from "./Experience.jsx";

import "./style.css";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// const created = (state) => {
//   // state.gl.setClearColor("#ff0000", 1);
//   // state.scene.background = new THREE.Color("#ffff00");
// };

root.render(
  <Canvas
    // shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
    // onCreated={created}
  >
    <Experience />
  </Canvas>
);
