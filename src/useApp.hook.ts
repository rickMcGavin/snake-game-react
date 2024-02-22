import { useCallback, useEffect, useState } from "react";
import { STARTING_GAME_SPEED_DELAY } from "./constants";

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

  const handleSetStartingGameSpeedDelay = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const num = Number(event.target.value);
    if (num < 50 || num > 1000) return;
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
        return setIsStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    changeTheme,
    handleSetStartingGameSpeedDelay,
    resetGame,
    handleIncrementScore,
    setIsStarted,
    isStarted,
    score,
    highScore,
    theme,
    startingGameSpeedDelay,
  };
};

export default useApp;
