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
  ThemeSelectContainer,
} from "./styles";
import logoUrl from "./assets/snake-game-ai-gen.png";
import {
  START_TEXT,
  SELECT_THEME,
  THEMES,
  START,
  GAME_SPEED,
  THEME_SELECTION,
  MIN_SPEED,
  MAX_SPEED,
} from "./constants";
import "@fontsource/vt323";
import useApp from "./useApp.hook";

function App() {
  const {
    highScore,
    isStarted,
    score,
    startingGameSpeedDelay,
    theme,
    changeTheme,
    handleIncrementScore,
    handleSetStartingGameSpeedDelay,
    resetGame,
    handleGameStart,
  } = useApp();
  return (
    <div className={`app ${theme}`}>
      {!isStarted ? (
        <Controls>
          <Button onClick={handleGameStart}>{START}</Button>
          <GameSpeedContainer>
            <GameSpeedLabel htmlFor="game-speed">{GAME_SPEED}</GameSpeedLabel>
            <GameSpeedInput
              id="game-speed"
              type="number"
              min={MIN_SPEED}
              max={MAX_SPEED}
              step="10"
              value={startingGameSpeedDelay}
              onChange={handleSetStartingGameSpeedDelay}
            />
          </GameSpeedContainer>
          <ThemeSelectContainer>
            <label htmlFor="theme-select">{THEME_SELECTION}</label>
            <ThemeSelect id="theme-select" value={theme} onChange={changeTheme}>
              <option value="" disabled>
                {SELECT_THEME}
              </option>
              {THEMES.map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </ThemeSelect>
          </ThemeSelectContainer>
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
