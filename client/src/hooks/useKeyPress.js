import { useEffect } from "react";
/**
 * useKeyPress
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(action, control) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.keyCode === 32) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, [control]); // eslint-disable-line
}
