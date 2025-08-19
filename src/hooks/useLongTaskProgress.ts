import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type LongTaskState = "idle" | "running" | "done" | "canceled" | "timeout";

export function useLongTaskProgress(totalMs = 6 * 60 * 1000) {
  const [state, setState] = useState<LongTaskState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const startAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const progress = useMemo(() => {
    const pct = (elapsed / totalMs) * 100;
    return Math.min(100, Math.max(0, Math.floor(pct)));
  }, [elapsed, totalMs]);

  const remainingMs = Math.max(0, totalMs - elapsed);

  const stopRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = useCallback(
    (t: number) => {
      if (startAtRef.current == null) return;
      const nextElapsed = t - startAtRef.current;
      setElapsed(nextElapsed);
      if (nextElapsed >= totalMs) {
        setState("timeout");
        stopRaf();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [totalMs]
  );

  const start = useCallback(() => {
    if (state === "running") return;
    setElapsed(0);
    setState("running");
    startAtRef.current = performance.now();
    stopRaf();
    rafRef.current = requestAnimationFrame(tick);
  }, [state, tick]);

  const finish = useCallback(() => {
    setState("done");
    stopRaf();
  }, []);

  const cancel = useCallback(() => {
    setState("canceled");
    stopRaf();
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setElapsed(0);
    startAtRef.current = null;
    stopRaf();
  }, []);

  useEffect(() => {
    return () => stopRaf();
  }, []);

  return {
    state,
    progress,
    elapsed,
    remainingMs,
    start,
    finish,
    cancel,
    reset,
    isRunning: state === "running",
  };
}

export function formatMMSS(ms: number) {
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60).toString().padStart(2, "0");
  const s = (totalSec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
