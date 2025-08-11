import { useEffect, useRef } from "react";

export const useAutoPlay = (callback, interval = 3000) => {
  const intervalRef = useRef(null);

  const restart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(callback, interval);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return { restart, stop };
};
