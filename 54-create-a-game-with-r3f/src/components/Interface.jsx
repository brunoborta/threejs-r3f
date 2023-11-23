import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const time = useRef();

  // Bad practice. Don't do that :D
  // const controls = useKeyboardControls((state) => state);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      // The phase variable is not updated normally.
      //Therefore, we need to use the useGame.getState() method.
      //This method returns the current state of the store.
      //It is not reactive.
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      console.log(elapsedTime);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward && "active"}`}></div>
          <div className={`key ${backward && "active"}`}></div>
          <div className={`key ${rightward && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump && "active"}`}></div>
        </div>
      </div>
    </div>
  );
}
