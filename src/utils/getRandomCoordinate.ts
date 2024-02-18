import { GRID_SIZE } from "../constants";
// generate random x, y coordinates between 1 and 20
export const getRandomCoordinate = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
};
