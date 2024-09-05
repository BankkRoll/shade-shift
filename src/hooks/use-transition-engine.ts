import { TransitionConfig, TransitionState } from "../types";
import { useCallback, useRef, useState } from "react";

export const useTransitionEngine = () => {
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    currentTransition: null,
    progress: 0,
  });

  const transitionQueue = useRef<TransitionConfig[]>([]);

  const queueTransition = useCallback((config: TransitionConfig) => {
    transitionQueue.current.push(config);
    processQueue();
  }, []);

  const processQueue = useCallback(async () => {
    if (state.isTransitioning || transitionQueue.current.length === 0) return;

    const nextTransition = transitionQueue.current.shift()!;
    setState((prev) => ({
      ...prev,
      isTransitioning: true,
      currentTransition: nextTransition,
    }));

    // TODO: Implement actual transition logic here

    setState((prev) => ({
      ...prev,
      isTransitioning: false,
      currentTransition: null,
      progress: 0,
    }));
    processQueue();
  }, [state.isTransitioning]);

  const updateProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
  }, []);

  return { state, queueTransition, updateProgress };
};
