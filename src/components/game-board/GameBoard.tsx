import { StyledGameBoard, Snake, Food } from "./styles";
import useGameBoard from "./useGameBoard.hook";

interface GameBoardProps {
  isStarted: boolean;
  resetGame: () => void;
  incrementScore: () => void;
  startingGameSpeedDelay: number;
}

const GameBoard = ({
  isStarted,
  resetGame,
  incrementScore,
  startingGameSpeedDelay,
}: GameBoardProps) => {
  const { snake, food } = useGameBoard({
    isStarted,
    resetGame,
    incrementScore,
    startingGameSpeedDelay,
  });

  return (
    <StyledGameBoard>
      {isStarted && (
        <>
          {snake.map((segment, index) => (
            <Snake key={index} $position={segment} />
          ))}
          <Food $position={food} />
        </>
      )}
    </StyledGameBoard>
  );
};

export default GameBoard;
