import { useState } from "react";

export default function useStateSideEffect<T>(
  sideEffect: Function,
  inital: any
) {
  const [state, setState] = useState<T>(inital);

  function update(value: any) {
    setState(value);
    sideEffect(value);
  }

  return [state, update] as const;
}
