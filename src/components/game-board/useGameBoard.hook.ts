import { useCallback, useEffect, useRef, useState } from "react";
import useSwipe from "../../hooks/useSwipe";
import { Direction, ArrowKeys } from "../../types";
import { getRandomCoordinate } from "../../utils/getRandomCoordinate";
import {
  DIRECTION_MAP,
  MIN_SPEED,
  STARTING_SNAKE_COORDINATE,
} from "../../constants";
import { GRID_SIZE } from "../../constants";
import { Coordinate } from "./types";

interface UseGameBoardProps {
  isStarted: boolean;
  startingGameSpeedDelay: number;
  resetGame: () => void;
  incrementScore: () => void;
}

const useGameBoard = ({
  isStarted,
  resetGame,
  incrementScore,
  startingGameSpeedDelay,
}: UseGameBoardProps) => {
  const [gameSpeedDelay, setGameSpeedDelay] = useState(startingGameSpeedDelay);
  const [snake, setSnake] = useState<Coordinate[]>([STARTING_SNAKE_COORDINATE]);
  const initialFood = useCallback(() => getRandomCoordinate(), []);
  const [food, setFood] = useState<Coordinate>(initialFood);

  // @note: useRef is used to store the current direction of the snake. We can update the value of the ref(change the direction) without causing a re-render. as a re-render slows it down slightly but noticeably
  const directionRef = useRef<Direction>(Direction.Right);

  const increaseSpeed = useCallback(() => {
    setGameSpeedDelay((prev) => {
      const newSpeed = prev * 0.933;
      return Math.max(newSpeed, MIN_SPEED); // Don't go below 50
    });
  }, []);

  const handleResetGame = useCallback(() => {
    resetGame();
    setSnake([STARTING_SNAKE_COORDINATE]);
    setGameSpeedDelay(startingGameSpeedDelay);
    directionRef.current = Direction.Right;
  }, [resetGame, startingGameSpeedDelay]);

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
    setGameSpeedDelay(startingGameSpeedDelay);
  }, [startingGameSpeedDelay]);

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
    if (!isStarted) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (DIRECTION_MAP[event.key as ArrowKeys]) {
        directionRef.current = DIRECTION_MAP[event.key as ArrowKeys];
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStarted]);

  useSwipe({ directionRef, isActive: isStarted });

  return { snake, food };
};

export default useGameBoard;
