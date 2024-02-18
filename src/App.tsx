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
} from "./styles";
import logoUrl from "./assets/snake-game-ai-gen.png";
import { START_TEXT } from "./constants";
import "@fontsource/vt323";

function App() {
  const [score, setScore] = useState("000");
  const [highScore, setHighScore] = useState("000");
  const [isStarted, setIsStarted] = useState(false);

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
    <>
      <div>
        <ScoresContainer>
          <Score>{score}</Score>
          {!!parseInt(highScore) && <HighScore>{highScore}</HighScore>}
        </ScoresContainer>
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
      </div>
      {!isStarted && (
        <>
          <InstructionText>{START_TEXT}</InstructionText>
          <Logo src={logoUrl} alt="snake-logo" />
        </>
      )}
    </>
  );
}

export default App;
