import styled, { css } from "styled-components";
import { Coordinate } from "./types";
export const StyledGameBoard = styled.div`
  border-radius: 100px;
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(20, 20px);
  margin: 5px;
`;

export const Snake = styled.div<{ position: Coordinate }>`
  ${({ position: { x, y } }) => {
    return css`
      grid-column: ${x};
      grid-row: ${y};
      background-color: #414141;
      border: #5a5a5a 1px dotted;
    `;
  }}
`;

export const Food = styled.div<{ position: Coordinate }>`
  ${({ position: { x, y } }) => {
    return css`
      grid-column: ${x};
      grid-row: ${y};
      background-color: #dedede;
      border: #999 5px solid;
    `;
  }}
`;
