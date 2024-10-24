import { useReducer } from "react";

type DirectionAction = { type: number };  

const directionReducer = (state: number, action: DirectionAction): number => {
  const steps = action.type;
  const newState = (state + steps) % 4; 

  return newState > 0 ? newState : newState + 4;
};

// Example Usage:
export default directionReducer;
