import styled, { css } from "styled-components";
import { Coordinate } from "./types";

export const StyledGameBoard = styled.div`
  border-radius: 100px;
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  margin: 5px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(20, 14px);
    grid-template-rows: repeat(20, 14px);
  }
`;

export const Snake = styled.div<{ $position: Coordinate }>`
  ${({ $position: { x, y } }) => {
    return css`
      grid-column: ${x};
      grid-row: ${y};
      background-color: var(--primary);
      border: var(--snake-border) 1px dotted;
    `;
  }}
`;

export const Food = styled.div<{ $position: Coordinate }>`
  ${({ $position: { x, y } }) => {
    return css`
      grid-column: ${x};
      grid-row: ${y};
      background-color: var(--food-bg);
      border: var(--food-border) 5px solid;
    `;
  }}
`;
