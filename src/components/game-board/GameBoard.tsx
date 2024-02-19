import { useCallback, useEffect, useRef, useState } from "react";
import { StyledGameBoard, Snake, Food } from "./styles";
import { Coordinate } from "./types";
import { getRandomCoordinate } from "../../utils/getRandomCoordinate";
import { Direction, ArrowKeys } from "../../types";
import {
  STARTING_GAME_SPEED_DELAY,
  STARTING_SNAKE_COORDINATE,
  DIRECTION_MAP,
} from "../../constants";
import { GRID_SIZE } from "../../constants";
import useSwipe from "../../hooks/useSwipe";

interface GameBoardProps {
  isStarted: boolean;
  resetGame: () => void;
  incrementScore: () => void;
}

const GameBoard = ({
  isStarted,
  resetGame,
  incrementScore,
}: GameBoardProps) => {
  const [gameSpeedDelay, setGameSpeedDelay] = useState(
    STARTING_GAME_SPEED_DELAY
  );
  const [snake, setSnake] = useState<Coordinate[]>([STARTING_SNAKE_COORDINATE]);
  const [food, setFood] = useState<Coordinate>(getRandomCoordinate());

  // @note: useRef is used to store the current direction of the snake.We can update the value of the ref(change the direction) without causing a re-render. as a re-render slows it down slightly but noticeably
  const directionRef = useRef<Direction>(Direction.Right);

  const increaseSpeed = useCallback(() => {
    if (gameSpeedDelay > 150) {
      setGameSpeedDelay((prev) => prev - 5);
    } else if (gameSpeedDelay > 100) {
      setGameSpeedDelay((prev) => prev - 3);
    } else if (gameSpeedDelay > 50) {
      setGameSpeedDelay((prev) => prev - 2);
    } else if (gameSpeedDelay > 25) {
      setGameSpeedDelay((prev) => prev - 1);
    }
  }, [gameSpeedDelay]);

  const handleResetGame = useCallback(() => {
    resetGame();
    setSnake([STARTING_SNAKE_COORDINATE]);
    setGameSpeedDelay(STARTING_GAME_SPEED_DELAY);
    directionRef.current = Direction.Right;
  }, [resetGame]);

  const checkCollision = useCallback(() => {
    const head = snake[0];

    if (head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE) {
      handleResetGame();
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        handleResetGame();
      }
    }
  }, [snake, handleResetGame]);

  const moveSnake = useCallback(() => {
    const head = { ...snake[0] };
    switch (directionRef.current) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }

    if (head.x === food.x && head.y === food.y) {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        newSnake.unshift(head);
        increaseSpeed();
        return newSnake;
      });
      setFood(getRandomCoordinate());
      incrementScore();
    } else {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        newSnake.unshift(head);
        newSnake.pop();
        return newSnake;
      });
    }
  }, [directionRef, food, snake, increaseSpeed, incrementScore]);

  useEffect(() => {
    let interval: number | null = null;

    if (isStarted) {
      checkCollision();
      interval = setInterval(() => {
        moveSnake();
      }, gameSpeedDelay);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStarted, gameSpeedDelay, moveSnake, checkCollision]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (DIRECTION_MAP[event.key as ArrowKeys]) {
        directionRef.current = DIRECTION_MAP[event.key as ArrowKeys];
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useSwipe({ directionRef });

  return (
    <StyledGameBoard>
      {isStarted && (
        <>
          {snake.map((segment, index) => (
            <Snake key={index} position={segment} />
          ))}
          <Food position={food} />
        </>
      )}
    </StyledGameBoard>
  );
};

export default GameBoard;
