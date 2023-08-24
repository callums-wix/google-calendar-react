import { useState } from "react";

export default function useDialog(ref: React.RefObject<HTMLDialogElement>) {
  const [dialog, setDialog] = useState(false);
  const setShowDialog = () => {
    setDialog(!dialog);
    if (!dialog) {
      console.log("here");

      requestAnimationFrame(() => ref.current?.showModal());
    } else requestIdleCallback(() => ref.current?.close());
  };
  return [dialog, setShowDialog] as const;
}
