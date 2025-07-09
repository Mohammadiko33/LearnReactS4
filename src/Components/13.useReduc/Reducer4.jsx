import { useReducer, useState } from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const fullLocationHandler = (state, action) => {
    switch (action.type) {
      case "QAR":
        return {
          ...state,
          qarra: action.val,
        };
      case "COU":
        return {
          ...state,
          country: action.val,
        };
      case "CIT":
        return {
          ...state,
          city: action.val,
        };
      default:
        return state;
    }
  };

  const locationObj = {
    qarra: "",
    country: "",
    city: "",
  };

  const [userLocation, dispatch] = useReducer(fullLocationHandler, locationObj);

  const style = {
    border: "none",
    display: "block",
    padding: ".5rem .75rem",
    fontFamily: "sans-serif",
    fontWeight: "700",
    backgroundColor: "#1ea7ec",
    color: "white",
    borderRadius: 7,
    marginBottom: 8,
  };

  return (
    <>
    
      <input
        type="text"
        onChange={e => dispatch({ type: "QAR" , val: e.target.value })}
        style={style}
        value={userLocation.qarra}
        placeholder="your qarra"
      />
      <input
        type="text"
        onChange={e => dispatch({ type: "COU" , val: e.target.value })}
        style={style}
        value={userLocation.country}
        placeholder="your country"
      />
      <input
        type="text"
        onChange={e => dispatch({ type: "CIT" , val: e.target.value })}
        style={style}
        value={userLocation.city}
        placeholder="your city"
      />
      <h1>location : </h1>
      <h3>
        Qarra : {userLocation.qarra} <br /> Country : {userLocation.country}{" "}
        <br /> City : {userLocation.city}
      </h3>
    </>
  );
}
