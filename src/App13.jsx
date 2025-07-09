import React, { useReducer, useState } from "react";
import "./Components/13.useReduc/reducer.css";
import Reducer2 from "./Components/13.useReduc/Reducer2";
import Reducer3 from "./Components/13.useReduc/Reducer3";
import Reducer4 from "./Components/13.useReduc/Reducer4";

export default function App13() {
  // wave 1 with state default

  // const [count, setCount] = useState(0);

  // const countMultiplyHandler = () => setCount((prev) => prev * 2);
  // const countAddHandler = () => setCount((prev) => prev + 1);
  // const countResetHandler = () => setCount(0);
  // const countMinusHandler = () => setCount((prev) => prev - 1);
  // const countDivitionHandler = () => setCount((prev) => prev / 2);

  // wave 2 with reducer

  const countReducer = (state, action) => {
    switch (action.type) {
      case "DIVITION": {
        return {
          num: state.num / 2,
        };
      }
      case "ADD": {
        return {
          num: state.num + 1,
        };
      }
      case "MINUS": {
        return {
          num: state.num - 1,
        };
      }
      case "MULTIPLY": {
        return {
          num: state.num * 2,
        };
      }
      case "RESET": {
        return {
          num: 0,
        };
      }
      default: {
        return {
          num: state,
        };
      }
    }
  };

  const [count, dispatch] = useReducer(countReducer, { num: 0 });

  const [reducTesTs, setReducTesTs] = useState(4);
  const showReducer3 = () => setReducTesTs(3);
  const showReducer1 = () => setReducTesTs(1);
  return (
    <>
      {reducTesTs === 1 ? (
        <div className="allR">
          <div className="r1">
            <button className="ad" onClick={() => dispatch({ type: "ADD" })}>
              Add +
            </button>
            <button
              className="mu"
              onClick={() => dispatch({ type: "MULTIPLY" })}
            >
              Multiply ×
            </button>
          </div>
          <div className="r2">
            <button className="re" onClick={() => dispatch({ type: "RESET" })}>
              Reset
            </button>
            <h3 className="res">{count.num}</h3>
            <button className="re" onClick={() => setReducTesTs(2)}>
              Next TesT
            </button>
          </div>
          <div className="r3">
            <button className="mi" onClick={() => dispatch({ type: "MINUS" })}>
              Minus -
            </button>
            <button
              className="di"
              onClick={() => dispatch({ type: "DIVITION" })}
            >
              Divition ÷
            </button>
          </div>
        </div>
      ) : reducTesTs === 2 ? (
        <Reducer2 showReducer3={showReducer3} />
      ) : reducTesTs === 3 ? (
        <Reducer3 showReducer1={showReducer1} />
      ) : (
        <Reducer4/>
      )}
    </>
  );
}
// use Reducer
