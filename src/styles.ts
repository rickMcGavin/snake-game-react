import styled from "styled-components";

export const ScoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Score = styled.div`
  color: var(--middle-border);
  font-size: 40px;
  font-weight: bolder;
  margin: 10px 0;
`;

export const HighScore = styled.div`
  font-size: 40px;
  font-weight: bolder;
  margin: 10px 0;
  color: var(--secondary-text);
`;

export const GameContainer = styled.div`
  position: relative;
`

export const GameBorderOuter = styled.div`
  border: var(--outer-border) solid 10px;
  border-radius: 30px;
  box-shadow: inset 0 0 0 10px var(--outer-border);
`;

export const GameBorderMiddle = styled.div`
  border: var(--middle-border) solid 8px;
  border-radius: 26px;
  box-shadow: inset 0 0 0 10px var(--middle-border);
`;

export const GameBorderInner = styled.div`
  background-color: var(--secondary);
  border: var(--inner-border) solid 30px;
  border-radius: 20px;
  box-shadow: inset 0 0 0 5px var(--inner-border);
`;

export const InstructionText = styled.h1`
  position: absolute;
  top: 60%;
  color: var(--primary-text);
  width: 300px;
  text-align: center;
  text-transform: capitalize;
  padding: 30px;
  margin: 0;
  z-index: 1;

  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Logo = styled.img`
  background-color: var(--secondary);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  @media (max-width: 600px) {
    width: 50%;
  }
`;

export const ThemeSelect = styled.select`
  background-color: var(--secondary);
  color: var(--primary-text);
  padding: 4px;
`;

export const ThemeSelectDummy = styled.div`
  height: calc(19px + 4px + 4px);
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.button`
  background-color: var(--secondary);
  color: var(--primary-text);
  display: none;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bolder;
  transition: background-color 0.3s;

  @media (max-width: 600px) {
    display: block;
  }
`;