import { useCallback, useEffect, useState } from "react";
import {
  GAME_SPEED_WARNING,
  STARTING_GAME_SPEED_DELAY,
  MIN_SPEED,
  MAX_SPEED,
} from "./constants";

const useApp = () => {
  const [score, setScore] = useState("000");
  const [highScore, setHighScore] = useState("000");
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState("");
  const [startingGameSpeedDelay, setStartingGameSpeedDelay] = useState(
    STARTING_GAME_SPEED_DELAY
  );

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
    setScore("000");
  }, []);

  const handleIncrementScore = useCallback(() => {
    setScore((prevScore) => {
      const newScore = parseInt(prevScore) + 1;
      if (newScore > parseInt(highScore)) {
        setHighScore(newScore.toString().padStart(3, "0"));
      }
      return newScore.toString().padStart(3, "0");
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
    score,
    highScore,
    theme,
    startingGameSpeedDelay,
  };
};

export default useApp;
