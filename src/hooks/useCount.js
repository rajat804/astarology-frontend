// hooks/useCount.js
import { useState, useEffect } from "react";

function useCount(to = 0, duration = 1400) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setNum(Math.round(progress * to));
      if (progress < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return num;
}

export default useCount;