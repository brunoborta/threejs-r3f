import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  SoftShadows,
  BakeShadows,
  OrbitControls,
  useHelper,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const durectionalLight = useRef();
  // useHelper(durectionalLight, THREE.DirectionalLightHelper, 1);
  const { blur, opacity, color } = useControls("Contact Shadows", {
    blur: { value: 3.5, min: 0, max: 10, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.1 },
    color: "#52250a",
  });

  // const { sunPosition } = useControls("Sky", {
  //   sunPosition: {
  //     value: [1, 2, 3],
  //   },
  // });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("Environment Map", {
      envMapIntensity: {
        value: 3.5,
        min: 0,
        max: 12,
      },
      envMapHeight: {
        value: 7,
        min: 0,
        max: 100,
      },
      envMapRadius: {
        value: 28,
        min: 10,
        max: 1000,
      },
      envMapScale: {
        value: 100,
        min: 10,
        max: 1000,
      },
    });

  useFrame((state, delta) => {
    // cube.current.rotation.y += delta * 0.2;
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      {/* EVERYTHING FROM HERE WAS EXPERIMENTS */}
      {/* <Environment
        background
        files={[
          "./environmentMaps/2/px.jpg",
          "./environmentMaps/2/nx.jpg",
          "./environmentMaps/2/py.jpg",
          "./environmentMaps/2/ny.jpg",
          "./environmentMaps/2/pz.jpg",
          "./environmentMaps/2/nz.jpg",
        ]}
      /> */}
      {/* <Environment
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        // resolution={32}
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
      > */}
      {/* <color args={["black"]} attach="background" /> */}
      {/* <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[100, 0, 0]} />
        </mesh> */}
      {/* </Environment> */}

      {/* <color attach="background" args={["ivory"]} /> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      {/* <directionalLight
        ref={durectionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        // frames={1}
      /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh position-x={-2} castShadow position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5} position-y={1} castShadow>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage> */}

      <Environment preset="city" background />
      <mesh position-x={-2} castShadow position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} position-y={1} castShadow>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
