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
} from "./styles";
import logoUrl from "./assets/snake-game-ai-gen.png";
import { START_TEXT, SELECT_THEME } from "./constants";
import "@fontsource/vt323";
import { THEMES } from "./constants";

function App() {
  const [score, setScore] = useState("000");
  const [highScore, setHighScore] = useState("000");
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState("");

  const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
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
          <ThemeSelect value={theme} onChange={changeTheme}>
            <option value="" disabled selected>
              {SELECT_THEME}
            </option>
            {THEMES.map((theme) => (
              <option value={theme}>{theme}</option>
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
