import { useCallback, useEffect, useRef, useState } from "react";
import {
  GAME_SPEED_WARNING,
  STARTING_GAME_SPEED_DELAY,
  MIN_SPEED,
  MAX_SPEED,
} from "./constants";

const useApp = () => {
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState("");
  const [startingGameSpeedDelay, setStartingGameSpeedDelay] = useState(
    STARTING_GAME_SPEED_DELAY
  );
  const highScore = useRef(0);

  const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleGameStart = useCallback(() => {
    if (
      Number(startingGameSpeedDelay) < MIN_SPEED ||
      Number(startingGameSpeedDelay) > MAX_SPEED
    ) {
      alert(GAME_SPEED_WARNING);
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  }, [startingGameSpeedDelay, setIsStarted]);

  const handleSetStartingGameSpeedDelay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = Number(event.target.value);
    setStartingGameSpeedDelay(num);
  };

  const resetGame = useCallback(() => {
    setIsStarted(false);
    setScore(0);
  }, []);

  const handleIncrementScore = useCallback(() => {
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if (newScore > highScore.current) {
        highScore.current = newScore;
      }
      return newScore;
    });
  }, [highScore]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.key === " ") {
        return handleGameStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleGameStart]);

  return {
    changeTheme,
    handleSetStartingGameSpeedDelay,
    resetGame,
    handleIncrementScore,
    handleGameStart,
    isStarted,
    score: score.toString().padStart(3, "0"),
    highScore: highScore.current.toString().padStart(3, "0"),
    theme,
    startingGameSpeedDelay,
  };
};

export default useApp;
