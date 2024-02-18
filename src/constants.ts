import { ArrowKeys, Direction } from "./types";

export const START_TEXT = "Press spacebar to start the game";

export const DIRECTION_MAP: { [key in ArrowKeys]: Direction } = {
  [ArrowKeys.ArrowUp]: Direction.Up,
  [ArrowKeys.ArrowDown]: Direction.Down,
  [ArrowKeys.ArrowLeft]: Direction.Left,
  [ArrowKeys.ArrowRight]: Direction.Right,
};

export const GRID_SIZE = 20;
export const STARTING_GAME_SPEED_DELAY = 200;
export const STARTING_SNAKE_COORDINATE = { x: 10, y: 10 };
