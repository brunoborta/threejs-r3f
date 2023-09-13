import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import {
  CineonToneMapping,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  LinearSRGBColorSpace,
} from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 10] }}
    // gl={{
    //   antialias: false,
    //   toneMapping: ACESFilmicToneMapping,
    //   outputColorSpace: LinearSRGBColorSpace,
    // }}
  >
    <Experience />
  </Canvas>
);
