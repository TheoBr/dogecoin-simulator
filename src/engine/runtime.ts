import { useGameStore } from "./game";
import { useEffect } from "react";

export const useGameRunner = () => {
  const gameStore = useGameStore();

  // Runs timers
  useEffect(() => {
    if (gameStore.paused) return;
    const currentUpdater = setInterval(() => {
      gameStore.runTick();
    }, 100);

    return () => clearInterval(currentUpdater);
  }, [gameStore.paused]);
};

export const useMarketRunner = () => {
  const setRandomDogePrice = useGameStore((state) => state.setRandomDogePrice);
  const ticks = useGameStore((state) => state.ticks);

  useEffect(() => {
    if (ticks % 20 === 0) {
      setRandomDogePrice();
    }
  }, [ticks]);
};
