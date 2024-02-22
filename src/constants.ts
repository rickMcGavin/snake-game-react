import { ArrowKeys, Direction } from "./types";

export const MIN_SPEED = 50;
export const MAX_SPEED = 1000;

export const START_TEXT = "Press spacebar to start the game";
export const SELECT_THEME = "Select a theme";
export const START = "Start";
export const GAME_SPEED = "Game speed";
export const THEME_SELECTION = "Theme selection";
export const GAME_SPEED_WARNING = `Game speed must be between ${MIN_SPEED} and ${MAX_SPEED}`;

export const DIRECTION_MAP: { [key in ArrowKeys]: Direction } = {
  [ArrowKeys.ArrowUp]: Direction.Up,
  [ArrowKeys.ArrowDown]: Direction.Down,
  [ArrowKeys.ArrowLeft]: Direction.Left,
  [ArrowKeys.ArrowRight]: Direction.Right,
};

export const GRID_SIZE = 20;
export const STARTING_GAME_SPEED_DELAY = 200;
export const STARTING_SNAKE_COORDINATE = { x: 10, y: 10 };

export const THEMES = [
  "default",
  "pipboy",
  "gruvbox",
  "cyberpunk",
  "synthwave",
  "sunset-sherbert",
  "miami",
  "dracula",
  "nord",
  "monokai",
  "zenburn",
  "mysticNight",
  "forties",
  "seventies",
  "eighties",
  "nineties",
  "artDeco",
  "galaxy",
  "jungleAdventure",
  "desertMirage",
  "arcticChill",
  "sunsetSerenity",
  "midnightMagic",
  "LANoir",
  "HollywoodGlam",
  "HollywoodPastel",
  "TiffanyBlue",
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
