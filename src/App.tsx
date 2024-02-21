import { useState, useEffect, useCallback } from "react";
import "./App.css";
import GameBoard from "./components/game-board/GameBoard";
import {
  ScoresContainer,
  Score,
  HighScore,
  GameBorderInner,
  GameBorderMiddle,
  GameBorderOuter,
  InstructionText,
  Logo,
  ThemeSelect,
  ThemeSelectDummy,
  Controls,
  Button,
  GameContainer,
  GameSpeedInput,
  GameSpeedContainer,
  GameSpeedLabel,
} from "./styles";
import logoUrl from "./assets/snake-game-ai-gen.png";
import {
  START_TEXT,
  SELECT_THEME,
  STARTING_GAME_SPEED_DELAY,
} from "./constants";
import "@fontsource/vt323";
import { THEMES } from "./constants";

function App() {
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

  return (
    <div className={`app ${theme}`}>
      {!isStarted ? (
        <Controls>
          <Button onClick={() => setIsStarted(true)}>Start</Button>
          <GameSpeedContainer>
            <GameSpeedLabel htmlFor="game-speed">
              Game Speed
            </GameSpeedLabel>
            <GameSpeedInput
              id="game-speed"
              type="number"
              min="50"
              max="1000"
              step="10"
              value={startingGameSpeedDelay}
              onChange={handleSetStartingGameSpeedDelay}
            />
          </GameSpeedContainer>
          <ThemeSelect value={theme} onChange={changeTheme}>
            <option value="" disabled>
              {SELECT_THEME}
            </option>
            {THEMES.map((theme, index) => (
              <option key={index} value={theme}>{theme}</option>
            ))}
          </ThemeSelect>
        </Controls>
      ) : (
        <ThemeSelectDummy />
      )}
      <div>
        <ScoresContainer>
          <Score>{score}</Score>
          {!!parseInt(highScore) && <HighScore>{highScore}</HighScore>}
        </ScoresContainer>
        <GameContainer>
          <GameBorderOuter>
            <GameBorderMiddle>
              <GameBorderInner>
                <GameBoard
                  incrementScore={handleIncrementScore}
                  resetGame={resetGame}
                  isStarted={isStarted}
                  startingGameSpeedDelay={startingGameSpeedDelay}
                />
              </GameBorderInner>
            </GameBorderMiddle>
          </GameBorderOuter>
          {!isStarted && (
            <>
              <InstructionText>{START_TEXT}</InstructionText>
              <Logo src={logoUrl} alt="snake-logo" />
            </>
          )}
        </GameContainer>
      </div>
    </div>
  );
}

export default App;
