import { useState } from "react";
import { State, StateObject } from "../services/state";

export function useGlobalState<K extends keyof StateObject>(
  key: K,
  globalState: State
) {
  const [state, setState] = useState(globalState.getValue(key));

  function updateState(newState: StateObject[Exclude<K, "days">]) {
    globalState.setState(key, newState);
    setState(globalState.getValue<K>(key));
  }
  return [state, updateState] as const;
}
